interface IconProjectsProps {
  stroked?: boolean | undefined;
  onClick?: (e: any) => void;
  className?: string;
}
export const Icon_add: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
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
        id="mask0_2349_4833"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2349_4833)">
        <path
          d="M7.33325 8.66659H3.33325V7.33325H7.33325V3.33325H8.66659V7.33325H12.6666V8.66659H8.66659V12.6666H7.33325V8.66659Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
export const Icon_autorenew: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2854_23340"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2854_23340)">
        <path
          d="M2.97516 9.36266C2.76127 8.99322 2.60086 8.61405 2.49391 8.22516C2.38697 7.83627 2.3335 7.43766 2.3335 7.02933C2.3335 5.72655 2.78558 4.61822 3.68975 3.70433C4.59391 2.79044 5.69739 2.3335 7.00016 2.3335H7.10225L6.16891 1.40016L6.98558 0.583496L9.31891 2.91683L6.98558 5.25016L6.16891 4.4335L7.10225 3.50016H7.00016C6.02794 3.50016 5.20155 3.84287 4.521 4.52829C3.84044 5.2137 3.50016 6.04739 3.50016 7.02933C3.50016 7.28211 3.52933 7.53002 3.58766 7.77308C3.646 8.01614 3.7335 8.25433 3.85016 8.48766L2.97516 9.36266ZM7.01475 13.4168L4.68141 11.0835L7.01475 8.75016L7.83141 9.56683L6.89808 10.5002H7.00016C7.97239 10.5002 8.79877 10.1575 9.47933 9.47204C10.1599 8.78662 10.5002 7.95294 10.5002 6.971C10.5002 6.71822 10.471 6.4703 10.4127 6.22725C10.3543 5.98419 10.2668 5.746 10.1502 5.51266L11.0252 4.63766C11.2391 5.00711 11.3995 5.38627 11.5064 5.77516C11.6134 6.16405 11.6668 6.56266 11.6668 6.971C11.6668 8.27377 11.2147 9.38211 10.3106 10.296C9.40641 11.2099 8.30294 11.6668 7.00016 11.6668H6.89808L7.83141 12.6002L7.01475 13.4168Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_content_copy: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2854_20652"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2854_20652)">
        <path
          d="M5.25 10.4998C4.92917 10.4998 4.65451 10.3856 4.42604 10.1571C4.19757 9.92866 4.08333 9.654 4.08333 9.33317V2.33317C4.08333 2.01234 4.19757 1.73768 4.42604 1.50921C4.65451 1.28074 4.92917 1.1665 5.25 1.1665H10.5C10.8208 1.1665 11.0955 1.28074 11.324 1.50921C11.5524 1.73768 11.6667 2.01234 11.6667 2.33317V9.33317C11.6667 9.654 11.5524 9.92866 11.324 10.1571C11.0955 10.3856 10.8208 10.4998 10.5 10.4998H5.25ZM5.25 9.33317H10.5V2.33317H5.25V9.33317ZM2.91667 12.8332C2.59583 12.8332 2.32118 12.7189 2.09271 12.4905C1.86424 12.262 1.75 11.9873 1.75 11.6665V3.49984H2.91667V11.6665H9.33333V12.8332H2.91667Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const IconSearch: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
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
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <path d="M7.91667 2.5C9.35326 2.5 10.731 3.07068 11.7468 4.0865C12.7627 5.10233 13.3333 6.48008 13.3333 7.91667C13.3333 9.25833 12.8417 10.4917 12.0333 11.4417L12.2583 11.6667H12.9167L17.0833 15.8333L15.8333 17.0833L11.6667 12.9167V12.2583L11.4417 12.0333C10.4917 12.8417 9.25833 13.3333 7.91667 13.3333C6.48008 13.3333 5.10233 12.7627 4.0865 11.7468C3.07068 10.731 2.5 9.35326 2.5 7.91667C2.5 6.48008 3.07068 5.10233 4.0865 4.0865C5.10233 3.07068 6.48008 2.5 7.91667 2.5ZM7.91667 4.16667C5.83333 4.16667 4.16667 5.83333 4.16667 7.91667C4.16667 10 5.83333 11.6667 7.91667 11.6667C10 11.6667 11.6667 10 11.6667 7.91667C11.6667 5.83333 10 4.16667 7.91667 4.16667Z" />
    </svg>
  );
};

export const Icon_delete_inlist: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
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
        id="mask0_2854_14807"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2854_14807)">
        <path
          d="M4.08333 12.25C3.7625 12.25 3.48785 12.1358 3.25937 11.9073C3.0309 11.6788 2.91667 11.4042 2.91667 11.0833V3.5H2.33333V2.33333H5.25V1.75H8.75V2.33333H11.6667V3.5H11.0833V11.0833C11.0833 11.4042 10.9691 11.6788 10.7406 11.9073C10.5122 12.1358 10.2375 12.25 9.91667 12.25H4.08333ZM9.91667 3.5H4.08333V11.0833H9.91667V3.5ZM5.25 9.91667H6.41667V4.66667H5.25V9.91667ZM7.58333 9.91667H8.75V4.66667H7.58333V9.91667Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};

export const Icon_checkbox: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
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
        id="mask0_2529_10146"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2529_10146)">
        <path
          d="M7.06667 10.8L11.7667 6.1L10.8333 5.16667L7.06667 8.93333L5.16667 7.03333L4.23333 7.96667L7.06667 10.8ZM3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 14 3.33333V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333ZM3.33333 12.6667H12.6667V3.33333H3.33333V12.6667Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_checkbox_checked: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    //e.stopPropagation();
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
        id="mask0_2529_10495"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2529_10495)">
        <path
          d="M7.06667 10.8L11.7667 6.1L10.8333 5.16667L7.06667 8.93333L5.16667 7.03333L4.23333 7.96667L7.06667 10.8ZM3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 14 3.33333V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333Z"
          fill="#656565"
        />
      </g>
    </svg>
  );
};
export const Icon_reloadlist: React.FC<IconProjectsProps> = ({
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
        id="mask0_2496_19971"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2496_19971)">
        <path
          d="M3.39996 10.7C3.15551 10.2778 2.97218 9.84443 2.84996 9.39999C2.72774 8.95555 2.66663 8.49999 2.66663 8.03332C2.66663 6.54443 3.18329 5.27777 4.21663 4.23332C5.24996 3.18888 6.51107 2.66666 7.99996 2.66666H8.11663L7.04996 1.59999L7.98329 0.666656L10.65 3.33332L7.98329 5.99999L7.04996 5.06666L8.11663 3.99999H7.99996C6.88885 3.99999 5.9444 4.39166 5.16663 5.17499C4.38885 5.95832 3.99996 6.9111 3.99996 8.03332C3.99996 8.32221 4.03329 8.60554 4.09996 8.88332C4.16663 9.1611 4.26663 9.43332 4.39996 9.69999L3.39996 10.7ZM8.01663 15.3333L5.34996 12.6667L8.01663 9.99999L8.94996 10.9333L7.88329 12H7.99996C9.11107 12 10.0555 11.6083 10.8333 10.825C11.6111 10.0417 12 9.08888 12 7.96666C12 7.67777 11.9666 7.39443 11.9 7.11666C11.8333 6.83888 11.7333 6.56666 11.6 6.29999L12.6 5.29999C12.8444 5.72221 13.0277 6.15555 13.15 6.59999C13.2722 7.04443 13.3333 7.49999 13.3333 7.96666C13.3333 9.45554 12.8166 10.7222 11.7833 11.7667C10.75 12.8111 9.48885 13.3333 7.99996 13.3333H7.88329L8.94996 14.4L8.01663 15.3333Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};

export const Icon_close: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
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
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2059_7246"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2059_7246)">
        <path d="M4.26659 12.6663L3.33325 11.733L7.06659 7.99967L3.33325 4.26634L4.26659 3.33301L7.99992 7.06634L11.7333 3.33301L12.6666 4.26634L8.93325 7.99967L12.6666 11.733L11.7333 12.6663L7.99992 8.93301L4.26659 12.6663Z" />
      </g>
    </svg>
  );
};
export const Icon_arrow_down: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={handleClick}
      focusable="false"
      className={className}
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
    </svg>
  );
};

export const Icon_edit_inlist: React.FC<IconProjectsProps> = ({
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="currentColor"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2854_14798"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="14"
        height="14"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2854_14798)">
        <path d="M2.91667 11.0833H3.74792L9.45 5.38125L8.61875 4.55L2.91667 10.2521V11.0833ZM1.75 12.25V9.77083L9.45 2.08542C9.56667 1.97847 9.69549 1.89583 9.83646 1.8375C9.97743 1.77917 10.1257 1.75 10.2812 1.75C10.4368 1.75 10.5875 1.77917 10.7333 1.8375C10.8792 1.89583 11.0056 1.98333 11.1125 2.1L11.9146 2.91667C12.0312 3.02361 12.1163 3.15 12.1698 3.29583C12.2233 3.44167 12.25 3.5875 12.25 3.73333C12.25 3.88889 12.2233 4.03715 12.1698 4.17812C12.1163 4.3191 12.0312 4.44792 11.9146 4.56458L4.22917 12.25H1.75ZM9.02708 4.97292L8.61875 4.55L9.45 5.38125L9.02708 4.97292Z" />
      </g>
    </svg>
  );
};
