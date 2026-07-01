function CheckBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="11" fill="#5566d6" />
      <path
        d="M-5 0 L-1.5 3.5 L5 -4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Requestor — a person at a laptop beside a request form panel. */
function IllustrationRequestor() {
  return (
    <svg viewBox="0 0 220 160" className="h-full w-full" role="img" aria-label="Person filling out a request form">
      {/* dotted flow line */}
      <path
        d="M10 120 C 40 90, 60 130, 95 100"
        fill="none"
        stroke="#9aa2e6"
        strokeWidth="1.6"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      {/* paper plane */}
      <path d="M6 60 L34 70 L14 78 L18 70 Z" fill="#c9cdf0" />

      {/* form panel */}
      <g transform="translate(150 26)">
        <rect x="0" y="0" width="56" height="104" rx="8" fill="#3b4bb8" />
        <rect x="9" y="12" width="38" height="6" rx="3" fill="#8b97e6" />
        <rect x="9" y="26" width="30" height="5" rx="2.5" fill="#6f7cdd" />
        <rect x="9" y="38" width="38" height="5" rx="2.5" fill="#6f7cdd" />
        <rect x="9" y="52" width="24" height="5" rx="2.5" fill="#6f7cdd" />
        <rect x="9" y="66" width="38" height="5" rx="2.5" fill="#6f7cdd" />
        <rect x="9" y="80" width="20" height="9" rx="4.5" fill="#b6a9e8" />
      </g>

      {/* seated figure */}
      <g transform="translate(64 34)">
        {/* hair */}
        <g fill="#5566d6">
          <circle cx="24" cy="14" r="12" />
          <circle cx="14" cy="18" r="8" />
          <circle cx="35" cy="18" r="8" />
          <circle cx="19" cy="8" r="8" />
          <circle cx="31" cy="8" r="8" />
        </g>
        {/* face */}
        <circle cx="25" cy="20" r="10" fill="#f0d9c4" />
        {/* body / jacket */}
        <path d="M6 74 C 6 48, 44 48, 44 74 L44 92 L6 92 Z" fill="#4a5bd0" />
        <path d="M20 50 L25 66 L30 50 Z" fill="#3b4bb8" />
        {/* arm to laptop */}
        <path d="M8 70 C 2 84, 10 92, 22 90" fill="none" stroke="#4a5bd0" strokeWidth="9" strokeLinecap="round" />
        {/* laptop */}
        <rect x="16" y="86" width="40" height="8" rx="2" fill="#2b3aa0" />
        <rect x="20" y="70" width="32" height="18" rx="2" fill="#8b97e6" />
      </g>

      <CheckBadge x={126} y={58} />
    </svg>
  );
}

/** Heuristics — a person holding a phone with a message and hint panel. */
function IllustrationGuidance() {
  return (
    <svg viewBox="0 0 220 160" className="h-full w-full" role="img" aria-label="Person receiving smart guidance on a phone">
      {/* dotted flow line */}
      <path
        d="M120 30 C 160 30, 150 70, 200 60"
        fill="none"
        stroke="#9aa2e6"
        strokeWidth="1.6"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      {/* kite / paper plane accent */}
      <path d="M18 96 L36 84 L30 104 L26 94 Z" fill="#8b97e6" />

      {/* envelope notification */}
      <g transform="translate(176 18)">
        <rect x="0" y="0" width="30" height="22" rx="3" fill="#dfe2f7" stroke="#7c86e0" strokeWidth="1.4" />
        <path d="M2 3 L15 12 L28 3" fill="none" stroke="#7c86e0" strokeWidth="1.4" />
        <circle cx="30" cy="2" r="5" fill="#ef7a3a" />
      </g>

      {/* hint panel */}
      <g transform="translate(150 78)">
        <rect x="0" y="0" width="52" height="40" rx="6" fill="#2b3aa0" />
        <text x="26" y="27" textAnchor="middle" fontSize="18" fontWeight="700" fill="#b6a9e8">
          Aa
        </text>
      </g>

      {/* standing figure */}
      <g transform="translate(50 20)">
        {/* hair */}
        <path d="M12 22 C 12 4, 44 4, 44 24 L44 40 L12 40 Z" fill="#2b3aa0" />
        {/* face */}
        <circle cx="28" cy="22" r="11" fill="#e8c6a8" />
        <path d="M16 18 C 16 6, 40 6, 40 20 L40 12 L16 14 Z" fill="#2b3aa0" />
        {/* body */}
        <path d="M8 96 C 8 58, 48 58, 48 96 L48 120 L8 120 Z" fill="#5566d6" />
        <rect x="24" y="56" width="8" height="10" rx="4" fill="#e8c6a8" />
        {/* raised arm holding phone */}
        <path d="M42 74 C 60 70, 62 52, 58 44" fill="none" stroke="#5566d6" strokeWidth="9" strokeLinecap="round" />
        <rect x="52" y="30" width="16" height="26" rx="3" fill="#1f2a80" />
        <rect x="55" y="34" width="10" height="16" rx="1.5" fill="#8b97e6" />
      </g>

      <CheckBadge x={126} y={112} />
    </svg>
  );
}

function ConceptCard({
  badge,
  title,
  description,
  illustration,
}: {
  badge: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-ink/5 bg-[#f5f5fb] p-6">
      <span className="w-fit rounded-full bg-[#eeeafb] px-4 py-1.5 text-xs font-semibold text-periwinkle">
        {badge}
      </span>
      <div className="h-36">{illustration}</div>
      <div>
        <p className="text-lg font-semibold text-ink">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-ink">{description}</p>
      </div>
    </div>
  );
}

export function JPMorganCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      <ConceptCard
        badge="Requestor"
        title="Streamlined Intake"
        description="Standardized request forms and workflows reduce back-and-forth communication and speed up kickoff."
        illustration={<IllustrationRequestor />}
      />
      <ConceptCard
        badge="Heuristics"
        title="Smart Guidance"
        description="Contextual suggestions and documentation help teams submit complete, high-quality requests with ease."
        illustration={<IllustrationGuidance />}
      />
    </div>
  );
}
