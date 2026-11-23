export function GapScene({ settled }: { settled: boolean }) {
  return (
    <>
      <ellipse cx="192" cy="356" rx="123" ry="11" fill="#d7c6aa" />
      <g data-gap-character>
        <path d="m141 237 44 6-18 93-33-4Zm57 4 35-8 30 101-35 4Z" fill="#292825" />
        <path d="M103 351q-1-24 34-28 23-2 33 13l1 15Zm111 0q1-25 31-26 28-1 37 26Z" fill="#b45d38" />
        <path d="M103 348h68v12h-68Zm111 0h68v12h-68Z" fill="#f2dfb8" />
        <path d="M138 182q43-6 87 1l15 70q-49 25-108 0Z" fill="#292825" />
        <path d="M129 195q-37 13-40 40 0 24 31 30" fill="none" stroke="#292825" strokeWidth="15" strokeLinecap="round" />
        <path d="M76 182Q102 90 200 92q78 2 100 61-52 26-224 29Z" fill="#514a76" />
        <path d="M76 182q99-7 145-23 45-15 54-34 17 12 25 28-52 26-224 29Z" fill="#3d385f" />
        <ellipse cx="210" cy="131" rx="9" ry="15" fill="#faf0d4" />
        <ellipse cx="234" cy="127" rx="9" ry="15" fill="#faf0d4" />
        <ellipse cx="214" cy="132" rx="3.5" ry="7" fill="#252420" />
        <ellipse cx="238" cy="128" rx="3.5" ry="7" fill="#252420" />
        <path d="M200 108q7-8 15-4m12-1q7-6 14-2" fill="none" stroke="#252420" strokeWidth="3" strokeLinecap="round" />
        <circle cx="169" cy="221" r="9" fill="#f2dfb8" />
        <circle cx="169" cy="221" r="2.5" fill="#b45d38" />
      </g>

      <g data-gap-grid>
        <rect x="357" y="82" width="255" height="241" rx="9" fill="#e4d6be" />
        <rect x="348" y="73" width="255" height="241" rx="9" fill="#faf8f0" stroke="#292825" strokeWidth="2.4" />
        <path d="M369 103h119m-119 13h77" fill="none" stroke="#514a76" strokeWidth="3" strokeLinecap="round" />
        <rect x="370" y="138" width="96" height="62" rx="4" fill="#b9cebf" />
        <rect x="482" y="138" width="96" height="62" rx="4" fill="#edbc9e" />
        <rect x="370" y="216" width="96" height="62" rx="4" fill="#faf0d4" />
        <rect data-gap-target x="370" y="216" width="96" height="62" rx="4" fill={settled ? "#f5d77f" : "none"} stroke="#8d5429" strokeWidth="2.5" strokeDasharray="6 5" />
        <rect x="482" y="216" width="96" height="62" rx="4" fill="#b9cebf" />
      </g>

      <g data-gap-lens transform={settled ? "translate(36 54)" : undefined}>
        <path d="M211 257q34 12 68 6l49-25" fill="none" stroke="#292825" strokeWidth="14" strokeLinecap="round" />
        <path d="m329 247 32-33" fill="none" stroke="#292825" strokeWidth="13" strokeLinecap="round" />
        <circle cx="382" cy="193" r="36" fill="#faf8f0" fillOpacity=".62" stroke="#292825" strokeWidth="5" />
        <path d="M356 185q6-15 19-19" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="m413 138 9-12m0 22 14-5" fill="none" stroke="#e6a53b" strokeWidth="5" strokeLinecap="round" />
      </g>
    </>
  );
}
