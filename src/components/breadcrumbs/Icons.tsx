interface IconProjectsProps {
  onClick?: (e: any) => void;
  className?: string;
}
export const Icon_nav: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_275_2996"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect x="0.5" width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_275_2996)">
        <path
          d="M3.5 10.5C2.95 10.5 2.47917 10.3042 2.0875 9.9125C1.69583 9.52083 1.5 9.05 1.5 8.5C1.5 7.95 1.69583 7.47917 2.0875 7.0875C2.47917 6.69583 2.95 6.5 3.5 6.5C4.05 6.5 4.52083 6.69583 4.9125 7.0875C5.30417 7.47917 5.5 7.95 5.5 8.5C5.5 9.05 5.30417 9.52083 4.9125 9.9125C4.52083 10.3042 4.05 10.5 3.5 10.5ZM9.5 10.5C8.95 10.5 8.47917 10.3042 8.0875 9.9125C7.69583 9.52083 7.5 9.05 7.5 8.5C7.5 7.95 7.69583 7.47917 8.0875 7.0875C8.47917 6.69583 8.95 6.5 9.5 6.5C10.05 6.5 10.5208 6.69583 10.9125 7.0875C11.3042 7.47917 11.5 7.95 11.5 8.5C11.5 9.05 11.3042 9.52083 10.9125 9.9125C10.5208 10.3042 10.05 10.5 9.5 10.5ZM3.5 9.5C3.775 9.5 4.01042 9.40208 4.20625 9.20625C4.40208 9.01042 4.5 8.775 4.5 8.5C4.5 8.225 4.40208 7.98958 4.20625 7.79375C4.01042 7.59792 3.775 7.5 3.5 7.5C3.225 7.5 2.98958 7.59792 2.79375 7.79375C2.59792 7.98958 2.5 8.225 2.5 8.5C2.5 8.775 2.59792 9.01042 2.79375 9.20625C2.98958 9.40208 3.225 9.5 3.5 9.5ZM9.5 9.5C9.775 9.5 10.0104 9.40208 10.2063 9.20625C10.4021 9.01042 10.5 8.775 10.5 8.5C10.5 8.225 10.4021 7.98958 10.2063 7.79375C10.0104 7.59792 9.775 7.5 9.5 7.5C9.225 7.5 8.98958 7.59792 8.79375 7.79375C8.59792 7.98958 8.5 8.225 8.5 8.5C8.5 8.775 8.59792 9.01042 8.79375 9.20625C8.98958 9.40208 9.225 9.5 9.5 9.5ZM6.5 5.5C5.95 5.5 5.47917 5.30417 5.0875 4.9125C4.69583 4.52083 4.5 4.05 4.5 3.5C4.5 2.95 4.69583 2.47917 5.0875 2.0875C5.47917 1.69583 5.95 1.5 6.5 1.5C7.05 1.5 7.52083 1.69583 7.9125 2.0875C8.30417 2.47917 8.5 2.95 8.5 3.5C8.5 4.05 8.30417 4.52083 7.9125 4.9125C7.52083 5.30417 7.05 5.5 6.5 5.5ZM6.5 4.5C6.775 4.5 7.01042 4.40208 7.20625 4.20625C7.40208 4.01042 7.5 3.775 7.5 3.5C7.5 3.225 7.40208 2.98958 7.20625 2.79375C7.01042 2.59792 6.775 2.5 6.5 2.5C6.225 2.5 5.98958 2.59792 5.79375 2.79375C5.59792 2.98958 5.5 3.225 5.5 3.5C5.5 3.775 5.59792 4.01042 5.79375 4.20625C5.98958 4.40208 6.225 4.5 6.5 4.5Z"
          fill="#262626"
        />
      </g>
    </svg>
  );
};
export const Icon_language: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_426_2605"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_426_2605)">
        <path
          d="M6 11C5.31667 11 4.67083 10.8687 4.0625 10.6062C3.45417 10.3438 2.92292 9.98542 2.46875 9.53125C2.01458 9.07708 1.65625 8.54583 1.39375 7.9375C1.13125 7.32917 1 6.68333 1 6C1 5.30833 1.13125 4.66042 1.39375 4.05625C1.65625 3.45208 2.01458 2.92292 2.46875 2.46875C2.92292 2.01458 3.45417 1.65625 4.0625 1.39375C4.67083 1.13125 5.31667 1 6 1C6.69167 1 7.33958 1.13125 7.94375 1.39375C8.54792 1.65625 9.07708 2.01458 9.53125 2.46875C9.98542 2.92292 10.3438 3.45208 10.6062 4.05625C10.8687 4.66042 11 5.30833 11 6C11 6.68333 10.8687 7.32917 10.6062 7.9375C10.3438 8.54583 9.98542 9.07708 9.53125 9.53125C9.07708 9.98542 8.54792 10.3438 7.94375 10.6062C7.33958 10.8687 6.69167 11 6 11ZM6 9.975C6.21667 9.675 6.40417 9.3625 6.5625 9.0375C6.72083 8.7125 6.85 8.36667 6.95 8H5.05C5.15 8.36667 5.27917 8.7125 5.4375 9.0375C5.59583 9.3625 5.78333 9.675 6 9.975ZM4.7 9.775C4.55 9.5 4.41875 9.21458 4.30625 8.91875C4.19375 8.62292 4.1 8.31667 4.025 8H2.55C2.79167 8.41667 3.09375 8.77917 3.45625 9.0875C3.81875 9.39583 4.23333 9.625 4.7 9.775ZM7.3 9.775C7.76667 9.625 8.18125 9.39583 8.54375 9.0875C8.90625 8.77917 9.20833 8.41667 9.45 8H7.975C7.9 8.31667 7.80625 8.62292 7.69375 8.91875C7.58125 9.21458 7.45 9.5 7.3 9.775ZM2.125 7H3.825C3.8 6.83333 3.78125 6.66875 3.76875 6.50625C3.75625 6.34375 3.75 6.175 3.75 6C3.75 5.825 3.75625 5.65625 3.76875 5.49375C3.78125 5.33125 3.8 5.16667 3.825 5H2.125C2.08333 5.16667 2.05208 5.33125 2.03125 5.49375C2.01042 5.65625 2 5.825 2 6C2 6.175 2.01042 6.34375 2.03125 6.50625C2.05208 6.66875 2.08333 6.83333 2.125 7ZM4.825 7H7.175C7.2 6.83333 7.21875 6.66875 7.23125 6.50625C7.24375 6.34375 7.25 6.175 7.25 6C7.25 5.825 7.24375 5.65625 7.23125 5.49375C7.21875 5.33125 7.2 5.16667 7.175 5H4.825C4.8 5.16667 4.78125 5.33125 4.76875 5.49375C4.75625 5.65625 4.75 5.825 4.75 6C4.75 6.175 4.75625 6.34375 4.76875 6.50625C4.78125 6.66875 4.8 6.83333 4.825 7ZM8.175 7H9.875C9.91667 6.83333 9.94792 6.66875 9.96875 6.50625C9.98958 6.34375 10 6.175 10 6C10 5.825 9.98958 5.65625 9.96875 5.49375C9.94792 5.33125 9.91667 5.16667 9.875 5H8.175C8.2 5.16667 8.21875 5.33125 8.23125 5.49375C8.24375 5.65625 8.25 5.825 8.25 6C8.25 6.175 8.24375 6.34375 8.23125 6.50625C8.21875 6.66875 8.2 6.83333 8.175 7ZM7.975 4H9.45C9.20833 3.58333 8.90625 3.22083 8.54375 2.9125C8.18125 2.60417 7.76667 2.375 7.3 2.225C7.45 2.5 7.58125 2.78542 7.69375 3.08125C7.80625 3.37708 7.9 3.68333 7.975 4ZM5.05 4H6.95C6.85 3.63333 6.72083 3.2875 6.5625 2.9625C6.40417 2.6375 6.21667 2.325 6 2.025C5.78333 2.325 5.59583 2.6375 5.4375 2.9625C5.27917 3.2875 5.15 3.63333 5.05 4ZM2.55 4H4.025C4.1 3.68333 4.19375 3.37708 4.30625 3.08125C4.41875 2.78542 4.55 2.5 4.7 2.225C4.23333 2.375 3.81875 2.60417 3.45625 2.9125C3.09375 3.22083 2.79167 3.58333 2.55 4Z"
          fill="#6D6D6D"
        />
      </g>
    </svg>
  );
};
export const Icon_adjust: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_426_1210"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_426_1210)">
        <path
          d="M6 7.5C6.41667 7.5 6.77083 7.35417 7.0625 7.0625C7.35417 6.77083 7.5 6.41667 7.5 6C7.5 5.58333 7.35417 5.22917 7.0625 4.9375C6.77083 4.64583 6.41667 4.5 6 4.5C5.58333 4.5 5.22917 4.64583 4.9375 4.9375C4.64583 5.22917 4.5 5.58333 4.5 6C4.5 6.41667 4.64583 6.77083 4.9375 7.0625C5.22917 7.35417 5.58333 7.5 6 7.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.6062C3.44167 10.3437 2.9125 9.9875 2.4625 9.5375C2.0125 9.0875 1.65625 8.55833 1.39375 7.95C1.13125 7.34167 1 6.69167 1 6C1 5.30833 1.13125 4.65833 1.39375 4.05C1.65625 3.44167 2.0125 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65625 4.05 1.39375C4.65833 1.13125 5.30833 1 6 1C6.69167 1 7.34167 1.13125 7.95 1.39375C8.55833 1.65625 9.0875 2.0125 9.5375 2.4625C9.9875 2.9125 10.3437 3.44167 10.6062 4.05C10.8687 4.65833 11 5.30833 11 6C11 6.69167 10.8687 7.34167 10.6062 7.95C10.3437 8.55833 9.9875 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3437 7.95 10.6062C7.34167 10.8687 6.69167 11 6 11ZM6 10C7.11667 10 8.0625 9.6125 8.8375 8.8375C9.6125 8.0625 10 7.11667 10 6C10 4.88333 9.6125 3.9375 8.8375 3.1625C8.0625 2.3875 7.11667 2 6 2C4.88333 2 3.9375 2.3875 3.1625 3.1625C2.3875 3.9375 2 4.88333 2 6C2 7.11667 2.3875 8.0625 3.1625 8.8375C3.9375 9.6125 4.88333 10 6 10Z"
          fill="#262626"
        />
      </g>
    </svg>
  );
};
export const Icon_account_balance: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_426_1016"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_426_1016)">
        <path
          d="M2.5 8.5V5H3.5V8.5H2.5ZM5.5 8.5V5H6.5V8.5H5.5ZM1 10.5V9.5H11V10.5H1ZM8.5 8.5V5H9.5V8.5H8.5ZM1 4V3L6 0.5L11 3V4H1ZM3.225 3H8.775L6 1.625L3.225 3Z"
          fill="#262626"
        />
      </g>
    </svg>
  );
};
