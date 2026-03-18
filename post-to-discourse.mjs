import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return "";
  return args[index + 1] || "";
};

const hasFlag = (flag) => args.includes(flag);

const positional = args.filter((arg, index) => {
  const previous = args[index - 1];
  if (previous && ["--topic", "--title", "--category"].includes(previous)) {
    return false;
  }

  return !arg.startsWith("--");
});

const inputArg = positional[0] || "discourse-post-template.md";
const dryRun = hasFlag("--dry-run");

const topicId = getArgValue("--topic") || process.env.DISCOURSE_TOPIC_ID || "";
const title = getArgValue("--title") || process.env.DISCOURSE_TITLE || "";
const categoryId = getArgValue("--category") || process.env.DISCOURSE_CATEGORY_ID || "";
const baseUrl = (process.env.DISCOURSE_BASE_URL || "").replace(/\/+$/, "");
const apiKey = process.env.DISCOURSE_API_KEY || "";
const apiUsername = process.env.DISCOURSE_API_USERNAME || "";

const inputPath = path.resolve(process.cwd(), inputArg);

if (!fs.existsSync(inputPath)) {
  console.error(`Missing input file: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8").trim();

if (!raw) {
  console.error(`Input file is empty: ${inputPath}`);
  process.exit(1);
}

if (!dryRun) {
  const missing = [
    !baseUrl && "DISCOURSE_BASE_URL",
    !apiKey && "DISCOURSE_API_KEY",
    !apiUsername && "DISCOURSE_API_USERNAME",
    !topicId && !title && "DISCOURSE_TOPIC_ID or --topic, or DISCOURSE_TITLE or --title",
  ].filter(Boolean);

  if (missing.length > 0) {
    console.error(`Missing required configuration: ${missing.join(", ")}`);
    process.exit(1);
  }
}

const payload = { raw };

if (topicId) {
  payload.topic_id = Number(topicId);
} else {
  payload.title = title;
  if (categoryId) {
    payload.category = Number(categoryId);
  }
}

const summarize = () => {
  const summary = {
    mode: dryRun ? "dry-run" : topicId ? "reply" : "new-topic",
    input: inputPath,
    target: topicId ? `topic ${topicId}` : title || "(missing title)",
    category: categoryId || "(none)",
    preview: raw.split(/\r?\n/).slice(0, 8),
  };

  console.log(JSON.stringify(summary, null, 2));
};

const buildPostUrl = (response) => {
  if (!baseUrl) return "";

  if (response.post_url) {
    return response.post_url.startsWith("http") ? response.post_url : `${baseUrl}${response.post_url}`;
  }

  if (response.topic_slug && response.topic_id && response.post_number) {
    return `${baseUrl}/t/${response.topic_slug}/${response.topic_id}/${response.post_number}`;
  }

  if (response.topic_id && response.post_number) {
    return `${baseUrl}/t/${response.topic_id}/${response.post_number}`;
  }

  return "";
};

if (dryRun) {
  summarize();
  process.exit(0);
}

const response = await fetch(`${baseUrl}/posts.json`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "api-key": apiKey,
    "api-username": apiUsername,
  },
  body: JSON.stringify(payload),
});

const text = await response.text();
let data = {};

try {
  data = text ? JSON.parse(text) : {};
} catch {
  data = { raw_response: text };
}

if (!response.ok) {
  console.error(JSON.stringify({ status: response.status, body: data }, null, 2));
  process.exit(1);
}

const postUrl = buildPostUrl(data);

console.log(
  JSON.stringify(
    {
      status: response.status,
      topic_id: data.topic_id || payload.topic_id || null,
      post_id: data.id || null,
      post_number: data.post_number || null,
      post_url: postUrl || null,
    },
    null,
    2
  )
);
