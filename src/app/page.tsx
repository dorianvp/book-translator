import { Word } from "@/components/word";
import { readFile } from "fs/promises";
import { join } from "path";
import { Key } from "react";

export default async function Home() {
  const fileContents = await readFile(join(process.cwd(), 'src/app/text.txt'), 'utf8');
  const translations = JSON.parse(await readFile(join(process.cwd(), 'src/app/translations.json'), 'utf8'));

  return (
    <main className="flex flex-col justify-start items-center min-h-screen bg-yellow-100">
      <section className="flex flex-col justify-start items-center p-5 w-full">
        <p>
          {
            fileContents.split(' ').map((word, i) => {
              return parseWord(word, translations, i)
            })
          }
        </p>
      </section>
    </main>
  );
}

function parseWord(word: string, translations: Object, key: Key): JSX.Element | string {
  const newWord = word.replace(/[\.,?!]/g, "");
  if (translations.hasOwnProperty(newWord.toLocaleLowerCase())) {
    //@ts-ignore
    return <Word word={newWord} translation={translations[newWord.toLocaleLowerCase() as keyof Object]} k={key} />
  }
  return word + ' ';
}

export const dynamic = 'force-dynamic';