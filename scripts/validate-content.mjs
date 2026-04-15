import fs from "node:fs";

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function assertUnique(items, field, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item[field]) {
      throw new Error(`${label}: empty ${field}`);
    }
    if (seen.has(item[field])) {
      throw new Error(`${label}: duplicate ${field} "${item[field]}"`);
    }
    seen.add(item[field]);
  }
  return seen;
}

function assertRefs(items, field, targetSet, label) {
  for (const item of items) {
    for (const ref of item[field] || []) {
      if (!targetSet.has(ref)) {
        throw new Error(`${label}: "${item.slug}" has broken ${field} reference "${ref}"`);
      }
    }
  }
}

const services = readJson("content/services.json");
const cases = readJson("content/cases.json");
const blog = readJson("content/blog.json");

const serviceSlugs = assertUnique(services, "slug", "services");
const caseSlugs = assertUnique(cases, "slug", "cases");
const blogSlugs = assertUnique(blog, "slug", "blog");

assertRefs(services, "relatedSlugs", serviceSlugs, "services");
assertRefs(services, "caseSlugs", caseSlugs, "services");
assertRefs(cases, "serviceSlugs", serviceSlugs, "cases");
assertRefs(blog, "serviceSlugs", serviceSlugs, "blog");
assertRefs(blog, "relatedSlugs", blogSlugs, "blog");

for (const service of services) {
  if (!/^[a-z0-9-]+$/.test(service.slug)) {
    throw new Error(`services: slug "${service.slug}" must be lowercase latin with hyphens`);
  }
  if (!service.metaTitle || !service.metaDescription || !service.h1) {
    throw new Error(`services: "${service.slug}" is missing SEO fields`);
  }
}

console.log(`Content OK: ${services.length} services, ${cases.length} cases, ${blog.length} posts`);
