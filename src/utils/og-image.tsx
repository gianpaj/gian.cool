import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import type { SatoriOptions } from "satori";
import type { ReactNode } from "react";

let wasmInitialized = false;

async function ensureWasmInitialized() {
  if (wasmInitialized) return;
  try {
    await initWasm(fetch("https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm"));
    wasmInitialized = true;
  } catch (e) {
    // Already initialized
    if (!(e instanceof Error && e.message.includes("Already initialized"))) {
      throw e;
    }
    wasmInitialized = true;
  }
}

const FONTS_CACHE: Map<string, ArrayBuffer> = new Map();

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const cached = FONTS_CACHE.get(url);
  if (cached) return cached;
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  FONTS_CACHE.set(url, buffer);
  return buffer;
}

async function loadFonts(): Promise<SatoriOptions["fonts"]> {
  const [regular, bold] = await Promise.all([
    fetchFont(
      "https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.ttf",
    ),
    fetchFont(
      "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf",
    ),
  ]);

  return [
    { name: "Satoshi", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Satoshi", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

function OgImageTemplate({ title, description }: { title: string; description: string }): ReactNode {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#141414",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: "#d4785e",
          }}
        />
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#e8e4de",
            lineHeight: 1.2,
            fontFamily: "Satoshi",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "#9ca3af",
            lineHeight: 1.5,
            fontFamily: "Satoshi",
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "#9ca3af",
            fontFamily: "Satoshi",
          }}
        >
          gian.cool
        </div>
      </div>
    </div>
  );
}

export async function generateOgImage(title: string, description: string): Promise<Uint8Array> {
  await ensureWasmInitialized();
  const fonts = await loadFonts();

  const svg = await satori(<OgImageTemplate title={title} description={description} />, {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });

  return resvg.render().asPng();
}
