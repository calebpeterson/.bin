import { describe, it, expect, vi } from "vitest";
import { parseChat } from "./parse-llm-chat";

describe("parseChat", () => {
  describe("valid parsing", () => {
    it("should correctly parse a chat string into role-message objects", async () => {
      const chatString = `
<!-- role: system -->
This is a system message.

<!-- role: user -->
This is a user message.

<!-- role: assistant -->
This is an assistant message.
      `;

      const expectedOutput = [
        { role: "system", content: "This is a system message." },
        { role: "user", content: "This is a user message." },
        { role: "assistant", content: "This is an assistant message." },
      ];

      await expect(parseChat(chatString)).resolves.toHaveProperty(
        "messages",
        expectedOutput
      );
    });
  });

  describe("edge cases", () => {
    it("should handle empty messages correctly", async () => {
      const chatString = `
<!-- role: system -->

<!-- role: user -->

<!-- role: assistant -->
      `;

      const expectedOutput = [
        { role: "system", content: "" },
        { role: "user", content: "" },
        { role: "assistant", content: "" },
      ];

      await expect(parseChat(chatString)).resolves.toHaveProperty(
        "messages",
        expectedOutput
      );
    });

    it("should return an empty array if no valid comments are found", async () => {
      const chatString = `This is just text with no valid role comments.`;

      const expectedOutput: { role: string; content: string }[] = [];

      await expect(parseChat(chatString)).resolves.toHaveProperty(
        "messages",
        expectedOutput
      );
    });
  });

  describe("frontmatter handling", () => {
    it("parses a chat with frontmatter metadata", async () => {
      const input = `---
title: Test Conversation
model: gpt-4
---

<!-- role: user -->
Hi there!`;

      const result = await parseChat(input);

      expect(result).toEqual({
        meta: { title: "Test Conversation", model: "gpt-4" },
        messages: [{ role: "user", content: "Hi there!" }],
      });
    });

    it("handles missing frontmatter gracefully", async () => {
      const input = `<!-- role: system -->
This is a system message.`;

      const result = await parseChat(input);

      expect(result).toEqual({
        meta: {},
        messages: [{ role: "system", content: "This is a system message." }],
      });
    });
  });

  describe("include directive", () => {
    it("processes an include using a custom include handler", async () => {
      const input = `<!-- role: user -->
First message.

<!-- include: included.md -->

<!-- role: assistant -->
Final message.`;

      const mockIncludeHandler = vi.fn(async (includePath) => {
        if (includePath === "included.md") {
          return `<!-- role: assistant -->
This is an included message.`;
        }
        return null;
      });

      const result = await parseChat(input, ".", {
        include: mockIncludeHandler,
      });

      expect(mockIncludeHandler).toHaveBeenCalledWith("included.md", ".");
      expect(result).toEqual({
        meta: {},
        messages: [
          { role: "user", content: "First message." },
          { role: "assistant", content: "This is an included message." },
          { role: "assistant", content: "Final message." },
        ],
      });
    });

    it("skips missing includes gracefully", async () => {
      const input = `<!-- role: user -->
First message.

<!-- include: missing.md -->

<!-- role: assistant -->
Final message.`;

      const mockIncludeHandler = vi.fn(async () => null);

      const result = await parseChat(input, ".", {
        include: mockIncludeHandler,
      });

      expect(mockIncludeHandler).toHaveBeenCalledWith("missing.md", ".");
      expect(result).toEqual({
        meta: {},
        messages: [
          { role: "user", content: "First message." },
          { role: "assistant", content: "Final message." },
        ],
      });
    });
  });
});
