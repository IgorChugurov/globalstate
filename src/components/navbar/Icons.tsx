interface IconProjectsProps {
  onClick?: (e: any) => void;
  className?: string;
}
export const Icon_key: React.FC<IconProjectsProps> = ({
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2349_7207"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2349_7207)">
        <path
          d="M4.66675 9.33333C4.30008 9.33333 3.98619 9.20278 3.72508 8.94167C3.46397 8.68056 3.33341 8.36667 3.33341 8C3.33341 7.63333 3.46397 7.31944 3.72508 7.05833C3.98619 6.79722 4.30008 6.66667 4.66675 6.66667C5.03341 6.66667 5.3473 6.79722 5.60841 7.05833C5.86953 7.31944 6.00008 7.63333 6.00008 8C6.00008 8.36667 5.86953 8.68056 5.60841 8.94167C5.3473 9.20278 5.03341 9.33333 4.66675 9.33333ZM4.66675 12C3.55564 12 2.61119 11.6111 1.83341 10.8333C1.05564 10.0556 0.666748 9.11111 0.666748 8C0.666748 6.88889 1.05564 5.94444 1.83341 5.16667C2.61119 4.38889 3.55564 4 4.66675 4C5.41119 4 6.08619 4.18333 6.69175 4.55C7.2973 4.91667 7.77786 5.4 8.13341 6H14.0001L16.0001 8L13.0001 11L11.6667 10L10.3334 11L8.91675 10H8.13341C7.77786 10.6 7.2973 11.0833 6.69175 11.45C6.08619 11.8167 5.41119 12 4.66675 12ZM4.66675 10.6667C5.28897 10.6667 5.83619 10.4778 6.30841 10.1C6.78064 9.72222 7.09453 9.24444 7.25008 8.66667H9.33341L10.3001 9.35L11.6667 8.33333L12.8501 9.25L14.1001 8L13.4334 7.33333H7.25008C7.09453 6.75556 6.78064 6.27778 6.30841 5.9C5.83619 5.52222 5.28897 5.33333 4.66675 5.33333C3.93341 5.33333 3.30564 5.59444 2.78341 6.11667C2.26119 6.63889 2.00008 7.26667 2.00008 8C2.00008 8.73333 2.26119 9.36111 2.78341 9.88333C3.30564 10.4056 3.93341 10.6667 4.66675 10.6667Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_folder_closed: React.FC<IconProjectsProps> = ({
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <path
        d="M12 8.5L17.7143 8.4975L17.8857 8.50375C18.4606 8.55075 18.9981 8.83377 19.3902 9.29605C19.7823 9.75832 20.0002 10.3657 20 10.9962V18.5C20 19.163 19.7592 19.7989 19.3305 20.2678C18.9019 20.7366 18.3205 21 17.7143 21H6.28571C5.67951 21 5.09812 20.7366 4.66947 20.2678C4.24082 19.7989 4 19.163 4 18.5V7.25C4 6.91848 4.12041 6.60054 4.33474 6.36612C4.54906 6.1317 4.83975 6 5.14286 6H9.71429L12 8.5ZM12 8.5H4"
        stroke="#0768FD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Icon_Person: React.FC<IconProjectsProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <mask
        id="mask0_2100_1952"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2100_1952)">
        <path
          d="M8.00033 8.00033C7.26699 8.00033 6.63921 7.73921 6.11699 7.21699C5.59477 6.69477 5.33366 6.06699 5.33366 5.33366C5.33366 4.60033 5.59477 3.97255 6.11699 3.45033C6.63921 2.9281 7.26699 2.66699 8.00033 2.66699C8.73366 2.66699 9.36144 2.9281 9.88366 3.45033C10.4059 3.97255 10.667 4.60033 10.667 5.33366C10.667 6.06699 10.4059 6.69477 9.88366 7.21699C9.36144 7.73921 8.73366 8.00033 8.00033 8.00033ZM2.66699 13.3337V11.467C2.66699 11.0892 2.76421 10.742 2.95866 10.4253C3.1531 10.1087 3.41144 9.86699 3.73366 9.70033C4.42255 9.35588 5.12255 9.09755 5.83366 8.92533C6.54477 8.7531 7.26699 8.66699 8.00033 8.66699C8.73366 8.66699 9.45588 8.7531 10.167 8.92533C10.8781 9.09755 11.5781 9.35588 12.267 9.70033C12.5892 9.86699 12.8475 10.1087 13.042 10.4253C13.2364 10.742 13.3337 11.0892 13.3337 11.467V13.3337H2.66699ZM4.00033 12.0003H12.0003V11.467C12.0003 11.3448 11.9698 11.2337 11.9087 11.1337C11.8475 11.0337 11.767 10.9559 11.667 10.9003C11.067 10.6003 10.4614 10.3753 9.85033 10.2253C9.23921 10.0753 8.62255 10.0003 8.00033 10.0003C7.3781 10.0003 6.76144 10.0753 6.15033 10.2253C5.53921 10.3753 4.93366 10.6003 4.33366 10.9003C4.23366 10.9559 4.1531 11.0337 4.09199 11.1337C4.03088 11.2337 4.00033 11.3448 4.00033 11.467V12.0003ZM8.00033 6.66699C8.36699 6.66699 8.68088 6.53644 8.94199 6.27533C9.2031 6.01421 9.33366 5.70033 9.33366 5.33366C9.33366 4.96699 9.2031 4.6531 8.94199 4.39199C8.68088 4.13088 8.36699 4.00033 8.00033 4.00033C7.63366 4.00033 7.31977 4.13088 7.05866 4.39199C6.79755 4.6531 6.66699 4.96699 6.66699 5.33366C6.66699 5.70033 6.79755 6.01421 7.05866 6.27533C7.31977 6.53644 7.63366 6.66699 8.00033 6.66699Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_Move_item: React.FC<IconProjectsProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <mask
        id="mask0_2100_886"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2100_886)">
        <path
          d="M13.4333 8.66667H5.33333V7.33333H13.4333L12.4 6.3L13.3333 5.33333L16 8L13.3333 10.6667L12.4 9.7L13.4333 8.66667ZM10 6V3.33333H3.33333V12.6667H10V10H11.3333V12.6667C11.3333 13.0333 11.2028 13.3472 10.9417 13.6083C10.6806 13.8694 10.3667 14 10 14H3.33333C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H10C10.3667 2 10.6806 2.13056 10.9417 2.39167C11.2028 2.65278 11.3333 2.96667 11.3333 3.33333V6H10Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
