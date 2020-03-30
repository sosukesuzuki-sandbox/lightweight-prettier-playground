import type Prettier from "prettier/standalone";
import type { Parser, Options } from "prettier";

type Parsers = { parsers: { [parserName: string]: Parser } };

let prettier: typeof Prettier | null = null;
const parsersMap: Map<string, Parsers> = new Map();

async function importTSParser() {
  const tsParser = await import(
    /* webpackChunkName: "prettier-ts-parser" */ "prettier/parser-typescript"
  );
  parsersMap.set("typescript", tsParser.default ?? tsParser);
}

export async function importSpecificParser(parser: string) {
  switch (parser) {
    case "typescript":
      await importTSParser();
    default:
      throw new Error(`parser ${parser} is not supported`);
  }
}

export function format(value: string, options: Options): Promise<string> {
  const parser = options.parser ?? "babel";
  const plugins = [
    parsersMap.get(parser as string) ?? parsersMap.get("babel")!,
  ];
  return new Promise((resolve, reject) => {
    if (!prettier) {
      reject("prettier  is not imported yet.");
      return;
    }
    const formatted = prettier.format(value, {
      ...options,
      plugins,
    });
    resolve(formatted);
  });
}

async function importPrettier(): Promise<void> {
  const [_prettier, babelParser] = await Promise.all([
    import(/* webpackChunkName: "prettier" */ "prettier/standalone"),
    import(/* webpackChunkName: "prettier" */ "prettier/parser-babel"),
  ]);

  prettier = (_prettier.default ?? _prettier) as typeof Prettier;
  parsersMap.set("babel", (babelParser.default ?? babelParser) as Parsers);
}

importPrettier();
