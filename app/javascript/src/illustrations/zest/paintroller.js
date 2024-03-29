import React from "react";

function PaintRollerIllustration({
  primaryColor = "var(--color-blue100)",
  secondaryColor = "var(--color-blue900)",
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 247 247" {...props}>
      <path
        fill={secondaryColor}
        d="M183.161 214.8c1.694.053 2.795 1.775 3.478 3.329a38.447 38.447 0 012.367 7.261c.242 1.044.414 2.135.141 3.166a5.908 5.908 0 01-1.264 2.203c-4.42 5.326-11.861 6.884-18.759 7.417-8.326.641-16.699.262-24.933-1.128-2.517-.426-5.047-.954-7.356-2.043-2.13-1.005-4.2-2.767-4.379-5.112a7.363 7.363 0 01.242-2.152 28.98 28.98 0 012.949-7.766"
      ></path>
      <path
        fill={secondaryColor}
        d="M183.161 215.645c1.188.145 1.936 1.552 2.389 2.522a31.563 31.563 0 011.561 4.246c.421 1.399.869 2.878 1.017 4.338.152 1.52-.591 2.628-1.576 3.698-3.178 3.45-7.763 5.033-12.265 5.851-5.546 1.007-11.343 1.055-16.945.823-5.753-.242-11.827-.671-17.375-2.312-2.343-.694-5.886-2.072-6.221-4.918-.179-1.533.531-3.336 1.012-4.769a37.328 37.328 0 011.937-4.534c.682-1.394-1.283-2.583-2.101-1.227-1.695 2.793-3.147 6.378-3.389 9.663-.216 2.885 1.694 5.18 4.052 6.584 2.733 1.624 5.979 2.244 9.075 2.755 3.527.587 7.082.991 10.65 1.21 6.611.395 13.437.307 19.97-.888 5.401-.99 11.179-3.217 14.434-7.894 2.123-3.052.434-7.31-.726-10.433-.983-2.662-2.198-6.16-5.49-6.402-1.101-.082-1.053 1.559 0 1.694l-.009-.007z"
      ></path>
      <path
        fill="#fff"
        d="M15.621 24.134c-4.54 34.905-4.909 69.53-.944 104.502.968 8.635 2.406 17.855 8.325 24.206 7.93 8.504 20.993 8.993 32.608 8.894l149.605-1.295c5.758-.051 11.761-.158 16.881-2.803 6.327-3.271 10.287-10.022 11.861-16.978 1.573-6.957 1.118-14.197.6-21.314-1.922-26.49-2.602-57.828-4.948-85.994-.861-10.555-9.188-18.962-19.735-19.924C158.175 8.764 18.557 1.562 15.621 24.134z"
      ></path>
      <path
        fill={secondaryColor}
        d="M14.781 23.904a421.064 421.064 0 00-2.25 94.682c.616 6.894 1.13 13.936 2.688 20.696 1.392 6.052 3.965 11.973 8.765 16.088 9.383 8.041 22.911 7.608 34.52 7.518 31.854-.249 63.706-.503 95.556-.762l47.778-.402c6.862-.058 14.185.285 20.519-2.813 5.471-2.663 9.254-7.823 11.44-13.386 2.617-6.661 2.75-14.01 2.38-21.059-.38-7.182-.969-14.352-1.361-21.544-.806-14.753-1.396-29.519-2.207-44.27-.402-7.281-.855-14.56-1.419-21.831-.242-3.07-.414-6.122-1.411-9.06a23.561 23.561 0 00-3.887-7.09 22.998 22.998 0 00-13.314-8.155c-3.481-.7-7.155-.785-10.692-1.073a1271.87 1271.87 0 00-49.593-3.055c-19.219-.835-38.458-1.319-57.688-1.12-16.808.174-33.728.714-50.394 3.057-5.916.83-11.883 1.876-17.569 3.764-3.665 1.21-7.796 2.805-10.348 5.858a7.746 7.746 0 00-1.835 3.873c-.208 1.515 2.114 2.178 2.322.639.047-.309.118-.613.213-.91a1.65 1.65 0 01.31-.727c.148-.262.31-.518.484-.764.174-.243-.1.094.171-.218.136-.158.272-.313.415-.46.242-.242.484-.484.747-.702.267-.241.553-.46.855-.654.74-.51 1.511-.972 2.31-1.384 4.18-2.179 9.21-3.401 13.993-4.37 14.79-2.994 30.095-3.698 45.146-4.15 18.711-.562 37.447-.31 56.158.302 17.343.57 34.676 1.469 52 2.699 6.717.472 13.434.968 20.136 1.595a20.683 20.683 0 0113.51 6.797 20.333 20.333 0 014.054 6.942c.969 2.861 1.126 5.81 1.358 8.811 1.123 14.42 1.813 28.866 2.506 43.312a2392.46 2392.46 0 002.377 42.019c.462 7.211.605 14.683-1.91 21.57-2.004 5.492-5.81 10.568-11.292 12.916-6.451 2.757-14.04 2.085-20.897 2.145l-23.65.211c-31.046.274-62.093.559-93.14.854l-23.407.223c-6.218.058-12.507.242-18.675-.714-5.581-.86-11.214-2.656-15.474-6.529-4.716-4.284-6.89-10.379-8.085-16.489-1.356-6.92-1.876-14.039-2.46-21.059a430.51 430.51 0 01-1.292-22.913 446.961 446.961 0 011.05-46.234 471.136 471.136 0 012.203-22.441c.114-.966-1.58-1.206-1.714-.233z"
      ></path>
      <path
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth="1.54"
        d="M89.568 51.543s-9.767 30.282 4.115 80.918a15.403 15.403 0 007.746 9.658c15.959 8.23 5.185-32.387 13.168-32.387 4.171 0 2.605 20.843 13.2 17.37 10.595-3.474 2.069-33.177 7.806-34.046 5.737-.869 1.581 20.498 9.38 20.498 11.987 0 3.147-18.312 10.074-19.455 6.129-1.009-3.819 36.825 11.813 33.003 8.407-2.055-1.91-38.909 2.433-39.43 4.342-.52.791 25.778 6.078 22.06 11.118-7.816-1.21-61.142-1.21-61.142l-84.603 2.953z"
      ></path>
      <path
        fill={secondaryColor}
        d="M157.648 64.66c4.197-.84 8.564-.784 12.829-.726 2.132.029 4.265.087 6.397.111 1.913.022 4.423-.39 6.11.688 1.919 1.227 2.256 4.475 2.716 6.499a68.904 68.904 0 011.389 8.554c.131 1.3.223 2.602.283 3.907.056 1.252.284 2.808-.312 3.972-.878 1.714-3.316 1.937-5.008 2.055-5.587.405-11.186.695-16.775 1.049-3.916.242-7.927.617-11.587 2.13-3.437 1.42-6.388 3.957-7.243 7.717-.6 2.662-.213 5.422 0 8.097l.661 8.66c.995 13.072 1.915 26.143 3.045 39.214.133 1.537 2.527 1.569 2.421 0-.794-12.028-1.772-24.058-2.689-36.086l-.693-9.143c-.217-2.861-.685-5.833-.472-8.714.317-4.282 3.566-6.727 7.407-7.92 4.459-1.385 9.223-1.407 13.841-1.695 2.978-.185 5.956-.373 8.935-.563 2.253-.148 4.681-.114 6.845-.853 1.937-.665 3.517-2.013 3.968-4.09.564-2.586.019-5.609-.286-8.201a77.4 77.4 0 00-1.472-8.472c-.515-2.232-.946-4.854-2.372-6.72-1.588-2.074-4.144-2.321-6.577-2.312-2.35 0-4.698-.055-7.048-.082-4.912-.06-10.068-.242-14.875.92-1.312.317-.75 2.27.554 2.009l.008-.005zM19.146 36.196c26.8-1.228 53.616-2.01 80.446-2.348 26.672-.348 53.346-.264 80.023.255 15.104.3 30.204.747 45.299 1.343 1.43.056 1.43-2.179 0-2.225a2307.42 2307.42 0 00-80.49-1.646 2349.72 2349.72 0 00-80.013 1.053 2408.44 2408.44 0 00-45.265 1.801c-1.133.056-1.143 1.82 0 1.767z"
      ></path>
      <path
        fill="#fff"
        d="M117.819 186.007c-6.407-16.169-8.341-41.956 13.158-46.647 11.489-2.508 24.16.852 35.065 4.655 3.319 1.157 6.594 2.536 9.479 4.543 4.258 2.958 7.521 7.187 9.901 11.793 4.02 7.787 5.482 16.683 4.858 25.385-.322 4.478-1.523 8.6-2.438 12.955-.726 3.435-2.694 7.746-2.203 11.174.492 3.427 3.51 6.051 1.976 9.52-1.414 3.2-5.364 5.119-8.472 6.138-7.56 2.489-14.33 1.562-22.028 1.797-7.233.22-14.219-.54-20.897-3.772-1.389-.67-2.767-1.481-3.696-2.713-1.893-2.508-.266-6.688-.395-9.646-.143-3.28-1.07-6.204-3.481-8.538-4.877-4.734-8.293-10.321-10.827-16.644z"
      ></path>
      <path
        fill={secondaryColor}
        d="M118.611 185.789a58.647 58.647 0 01-4.053-18.8c-.256-6.105.535-12.621 3.854-17.889 3.873-6.141 10.687-8.714 17.67-9.22 10.358-.77 20.752 2.227 30.389 5.732 4.749 1.726 9.096 4.101 12.548 7.848 3.256 3.529 5.669 7.872 7.288 12.376a47.098 47.098 0 012.709 15.18c.09 5.41-1.007 10.491-2.178 15.734-.514 2.29-1.165 4.509-1.794 6.778-.603 2.178-1.114 4.463-.755 6.719.334 2.094 1.559 3.842 2.142 5.851.607 2.089-.46 3.834-2.029 5.165-3.415 2.905-8.489 3.992-12.829 4.401-5.083.484-10.222.177-15.312.273-5.091.097-10.148-.343-15.008-1.89-2.297-.726-4.953-1.629-6.807-3.229-1.694-1.453-1.51-3.483-1.263-5.524.259-2.159.484-4.156.142-6.325a12.942 12.942 0 00-2.435-5.909c-1.392-1.825-3.183-3.33-4.638-5.117a48.093 48.093 0 01-4.049-5.916 52.219 52.219 0 01-3.174-6.349c-.619-1.474-3.057-.871-2.457.678 1.826 4.713 4.142 9.167 7.289 13.139a42.123 42.123 0 002.355 2.728c.888.946 1.905 1.791 2.643 2.863 1.286 1.864 1.842 4.178 1.855 6.422.012 2.244-.664 4.386-.514 6.606.163 2.401 1.324 4.159 3.283 5.524 2.127 1.481 4.763 2.44 7.22 3.207a42.686 42.686 0 007.858 1.598c5.431.619 10.972.271 16.428.281 5.311 0 10.707-.337 15.715-2.261 3.803-1.453 8.491-4.21 8.714-8.797.111-2.227-1.109-4.115-1.886-6.117-.9-2.319-.552-4.548.078-6.891 1.406-5.221 2.904-10.44 3.686-15.804a50.725 50.725 0 00-.353-16.301c-1.806-10.023-6.954-20.333-15.807-25.868-4.529-2.835-9.82-4.445-14.906-5.962-5.26-1.571-10.65-2.796-16.118-3.283-8.395-.75-17.986.221-24.373 6.294-9.959 9.481-8.165 26.014-4.387 37.875a69.824 69.824 0 001.649 4.618c.409.971 1.999.55 1.61-.438z"
      ></path>
      <path
        fill={secondaryColor}
        d="M140.95 197.016l-1.731-67.036 8.349-3.113 6.432.305s4.064-.818 5.669.276c2.861 1.956 6.46 52.936 6.46 52.936 1.867 9.247.378 27.626-8.987 28.762.004.009-13.636 3.357-16.192-12.13z"
      ></path>
      <path
        fill={secondaryColor}
        d="M142.071 197.016l-.586-22.683-.934-36.121-.211-8.23-.823 1.082 5.284-1.972c.908-.339 1.937-.596 2.801-1.046.409-.213 0-.058.073-.053.36.019.726.034 1.087.051 1.844.087 3.892.459 5.722.174 1.21-.191 2.551-.368 3.774-.116.22.043.643.319.835.314-.107 0-.218-.23-.09-.046-.242-.329.027.078.087.211.109.242-.08-.211.027.06.039.102.075.204.111.308.087.259.165.523.242.787.182.655.33 1.324.468 1.994.377 1.837.665 3.691.931 5.548.727 4.996 1.254 10.019 1.758 15.039.876 8.739 1.607 17.492 2.256 26.249.242 3.181.823 6.294.835 9.494a42.903 42.903 0 01-.944 9.46c-.608 2.73-1.515 5.589-3.285 7.811-1.254 1.578-2.776 2.42-4.742 2.769-.957.184-1.93.265-2.905.242-4.524-.075-8.341-2.421-10.302-6.536a19.472 19.472 0 01-1.496-5.083c-.242-1.418-2.403-.816-2.161.598 1.004 5.81 4.195 11.169 10.186 12.757 2.806.733 5.757.706 8.549-.078 5.713-1.694 7.838-8.637 8.714-13.846.548-3.317.748-6.682.596-10.04-.085-1.968-.484-4.232-.671-5.931-.297-2.718-.406-5.47-.624-8.196-.412-5.164-.859-10.328-1.341-15.492-.523-5.526-1.087-11.052-1.801-16.557-.484-3.727-.857-7.629-1.968-11.236-.387-1.254-.833-2.179-2.162-2.631-1.498-.501-3.209-.339-4.746-.124-.218.029-.436.061-.654.1-.283.05-.215 0 .041 0l-.992-.049-3.926-.186c-.625-.029-1.3-.148-1.91.014-2.162.576-4.292 1.6-6.388 2.382l-1.84.688c-.48.142-.812.579-.823 1.079l.586 22.696.932 36.122.213 8.23c.012 1.433 2.253 1.438 2.217-.007z"
      ></path>
      <path
        fill={primaryColor}
        d="M175.243 77.509c-3.614 4.115-79.376 8.392-84.663 3.05-5.287-5.343-3.043-23.141-1.04-28.95 2.001-5.81 82.22-9.38 84.66-3.05 2.44 6.33 4.657 24.835 1.043 28.95z"
      ></path>
      <path
        fill={primaryColor}
        d="M174.451 76.717c-.184.2-.055.056-.019.034-.11.072-.224.138-.341.196-.305.148-.124.065-.209.097-.181.07-.363.135-.547.196-.96.298-1.937.54-2.926.726-3.045.622-6.139 1.024-9.225 1.382-8.956 1.043-17.99 1.649-27.007 2.072-9.179.431-18.396.68-27.575.4a100.702 100.702 0 01-10.109-.68 27.525 27.525 0 01-3.229-.596c-.418-.105-.83-.236-1.232-.39-.266-.104.13.068-.043-.017-.073-.036-.146-.067-.216-.106a3.966 3.966 0 01-.39-.242c.303.213-.169-.19-.278-.315a7.054 7.054 0 01-.82-1.24 13.03 13.03 0 01-1.14-3.226c-.625-2.663-.746-5.42-.707-8.14.07-4.934.6-10.102 2.13-14.817.065-.2-.187.078.07-.13-.305.242 0 0 .102-.066.101-.065-.153.08.126-.08.16-.092.317-.181.484-.266.293-.161.603-.29.924-.385.484-.172.98-.32 1.474-.458 2.806-.776 5.703-1.234 8.581-1.645 8.46-1.21 17.022-1.801 25.552-2.22 9.082-.448 18.194-.654 27.283-.375 3.561.109 7.126.285 10.667.687 2.162.242 4.498.506 6.551 1.35-.281-.115.179.085.271.136.14.078.278.158.409.242 0 0 .133.153.14.167-.174-.353 0 0 .053.163.073.213.15.423.218.636.167.513.317 1.031.455 1.554.32 1.191.584 2.399.816 3.612 1.041 5.439 1.656 11.18 1.14 16.702-.15 1.593-.341 3.733-1.421 5.015-.922 1.097.654 2.69 1.586 1.584 1.312-1.56 1.716-3.631 1.968-5.614.353-2.77.312-5.587.138-8.37-.327-5.248-.91-10.946-2.798-15.899-.661-1.728-2.574-2.275-4.227-2.677-2.876-.7-5.875-.968-8.821-1.184-8.808-.66-17.684-.571-26.508-.302-9.44.285-18.912.837-28.321 1.885-3.616.405-7.235.872-10.808 1.566-2.21.431-4.61.872-6.615 1.954a3.263 3.263 0 00-1.525 1.474c-.86 1.869-1.138 4.193-1.452 6.202-.927 5.712-1.378 11.778-.242 17.496.595 3.117 1.805 6.576 5.022 7.658 2.477.828 5.214 1.027 7.797 1.24 8.714.726 17.516.55 26.244.288 9.823-.295 19.648-.855 29.432-1.78 3.914-.37 7.829-.798 11.718-1.386 2.394-.363 4.897-.7 7.185-1.528.624-.227 1.338-.484 1.801-.997.97-1.06-.61-2.65-1.586-1.583z"
      ></path>
      <path
        fill={secondaryColor}
        d="M24.05 55.24c-1.639 2.28-2.111 5.458-2.53 8.161a72.489 72.489 0 00-.832 11.876c.038 3.294.176 6.797 1.188 9.96.62 1.937 1.535 3.203 3.466 3.874 2.237.781 4.701 1.019 7.042 1.26 3.389.352 6.802.516 10.21.618 7.262.215 14.538.143 21.785-.218 2.576-.128 5.161-.276 7.72-.595 1.868-.242 3.43-.484 4.567-2.147 1.525-2.23 1.937-5.231 2.276-7.843.443-3.718.593-7.464.448-11.205-.07-3.4-.394-6.79-.969-10.142-.322-1.784-.605-3.825-2.215-4.902-1.568-1.048-3.609-1.467-5.429-1.82a73.046 73.046 0 00-8.886-1.075 154.12 154.12 0 00-21.224 0 91.399 91.399 0 00-9.15 1.017c-2.05.348-4.28.726-6.133 1.725a5.085 5.085 0 00-.887.613c-.255.205-.476.45-.653.726-.784 1.104 1.036 2.157 1.813 1.06-.184.26.041-.026.109-.087.068-.06-.075.036.165-.116a7.12 7.12 0 01.905-.47 17.984 17.984 0 012.435-.774 53.918 53.918 0 017.407-1.21 149.146 149.146 0 0119.922-.688c5.42.148 11.19.31 16.419 1.907a8.367 8.367 0 012.03.848c.484.292.555.38.726.856.85 2.394 1.097 5.045 1.322 7.558.317 3.526.414 7.068.29 10.607-.108 3.146-.34 6.366-1.173 9.418-.286 1.05-.632 2.179-1.293 3.06-.453.605-.76.743-1.452.89-1.801.38-3.697.485-5.568.608-6.564.467-13.165.588-19.747.542-6.252-.043-12.645-.096-18.832-1.096a23.162 23.162 0 01-3.007-.646c-.27-.083-.748-.243-.864-.3l-.37-.185a2.758 2.758 0 01-.242-.154c-1.55-1.402-1.733-4.559-1.937-6.48a65.938 65.938 0 01-.099-11.193c.22-3.346.613-6.73 1.486-9.976.281-1.038.598-2.11 1.155-3.037s-.799-1.649-1.394-.826zM25.843 103.595c7.02-.104 14.028 0 21.043-.152 7.014-.153 14.04-.109 21.042-.542 1.433-.087 1.452-2.232 0-2.249-7.005-.077-14.04.322-21.042.52-7.003.199-14.028.659-21.043.911-.968.034-.968 1.527 0 1.512zM26.918 114.406c5.21.431 10.44.551 15.664.358 5.233-.179 10.435-.726 15.659-1.075 1.425-.092 1.452-2.234 0-2.239-2.622-.014-5.231.322-7.84.54-2.61.218-5.21.38-7.82.484-5.213.223-10.444.242-15.663.184-1.135-.014-1.101 1.649 0 1.741v.007zM27.281 124.739c5.51-.205 11.04-.203 16.55-.012 1.452.051 1.44-2.19 0-2.241a133.85 133.85 0 00-16.55.46c-1.13.099-1.169 1.837 0 1.793zM199.778 58.943l.675 6.405c.109 1.028.213 2.057.327 3.083.087.78.063 1.76.658 2.363.485.484 1.174.525 1.816.51 1.096-.021 2.193-.072 3.287-.11 2.114-.073 4.227-.14 6.34-.202l3.05-.09c.794-.023 1.735.073 2.442-.362 1.51-.932.753-3.39.629-4.815l-.559-6.37c-.135-1.533-.397-3.005-2.154-3.31-2.227-.387-4.713-.184-6.964-.114-2.36.073-4.793.15-7.107.654-1.242.269-.968 2.222.298 2.2 4.086-.067 8.123-.57 12.226-.46h1.184c.181.175.111 1.048.13 1.269l.243 2.834.29 3.307.126 1.418c.014.167.167 1.56.242 1.368.276-.087.162-.097-.344-.03l-.939.042-1.409.065-3.05.138c-2.036.092-4.071.178-6.104.257-.511.022-1.141.15-1.644.068-.559-.092-.431.133-.47-.62-.05-1.021-.266-2.07-.399-3.084l-.835-6.405c-.165-1.251-2.142-1.295-2.007 0l.022-.01zM203.252 83.66c4.909-.303 9.835-.33 14.741-.618 1.431-.085 1.452-2.207 0-2.241-4.989-.121-10.038.484-14.966 1.19-.945.136-.727 1.727.225 1.668zM206.108 93.184c4.306-.12 8.69-.118 12.972-.612 1.394-.162 1.481-2.254 0-2.242-4.316.034-8.676.579-12.972.988-1.172.111-1.21 1.9 0 1.866zM212.956 101.681c2.021.221 4.064.117 6.051-.308 1.358-.3.758-2.26-.566-2.05a26.78 26.78 0 01-5.478.353c-1.304-.063-1.261 1.881 0 2.005h-.007zM115.74 109.095c-4.406-.385-5.665 4.476-6.069 7.869-.564 4.73-.276 9.354-.109 14.093.128 3.604-.436 8.579-4.454 9.983-3.788 1.321-6.623-2.861-8.603-5.376-.818-1.041-2.478.297-1.813 1.401 1.518 2.517 3.525 5.083 6.313 6.24 2.707 1.126 5.619.4 7.71-1.59 2.362-2.246 3.229-5.466 3.326-8.634.118-3.822-.455-7.63-.327-11.459.075-2.196.165-4.469.612-6.626.366-1.764 1.341-3.892 3.414-4.02a.942.942 0 000-1.881zM135.722 92.635c-5.468 3.549-3.856 11.883-3.459 17.31.421 5.766.123 12.587-5.183 16.135-1.196.802-.148 2.636 1.138 1.937 5.136-2.772 6.574-9.259 6.489-14.633-.058-3.681-.673-7.329-.665-11.013 0-2.953.351-6.333 2.725-8.393.727-.639-.225-1.885-1.045-1.353v.01zM158.935 124.831c1.397 1.494 2.948 3.074 5.069 3.37a5.447 5.447 0 004.841-1.898c3.057-3.471 1.949-8.196 1.937-12.396 0-1.21-1.68-1.128-1.83 0-.436 3.266.597 6.933-1.102 9.946-1.9 3.372-5.528 2.099-7.971.044-.644-.542-1.525.305-.934.934h-.01zM172.27 106.87c-.072 1.027-.109 2.089.53 2.958a2.506 2.506 0 002.629.94c2.392-.584 3.713-3.426 4.14-5.619.242-1.275-1.668-1.832-1.966-.542-.298 1.29-.879 2.743-1.903 3.65-.484.426-1.123.777-1.592.172-.354-.455-.451-1.183-.53-1.735-.112-.782-1.257-.523-1.308.176zM172.849 48.965a34.862 34.862 0 013.677 18.215 32.86 32.86 0 01-.656 4.6c-.242 1.13-.422 2.756-1.153 3.707-1.086 1.416-3.408 1.893-5.037 2.259-1.936.438-3.909.668-5.872.951-3.096.445-6.165.947-9.283 1.237-7.083.659-14.202.77-21.301.905-7.1.136-14.27.298-21.367 1.063-5.735.617-12.415 1.936-17.777-.937-7.417-3.967-7.131-14.025-5.92-21.16.183-1.095.397-2.182.64-3.261.243-1.1.543-2.825 1.63-3.445 2.527-1.44 5.165 5.282 5.749 6.853a34.704 34.704 0 012.018 10.152c.168 2.931.279 6.536-2.19 8.596-.968.81.348 2.558 1.367 1.774 2.397-1.842 3.198-4.636 3.317-7.562a37.266 37.266 0 00-1.092-10.072c-.79-3.26-2.07-6.51-3.994-9.271-1.559-2.232-4.466-4.333-6.99-2.118-1.874 1.643-2.216 4.565-2.64 6.884a50.683 50.683 0 00-.825 7.175c-.162 4.405.373 9.183 2.82 12.967 2.71 4.195 7.28 6.097 12.123 6.487 3.933.317 7.859-.28 11.761-.707 4.019-.438 8.056-.687 12.103-.845 8.076-.314 16.165-.276 24.236-.726 6.487-.363 12.894-1.237 19.309-2.239 2.311-.36 4.693-.81 6.802-1.87 2.386-1.2 3.033-3.116 3.616-5.602a35.545 35.545 0 00-3.292-25.041c-.625-1.162-2.353-.136-1.762 1.029l-.017.002z"
      ></path>
      <path
        fill={secondaryColor}
        d="M92.216 67.359a4.583 4.583 0 01-.29-.508c-.027-.053-.032-.07-.049-.107.025.053 0 0 0-.029a2.73 2.73 0 01-.155-.557c0 .013 0 .073 0 0a1.36 1.36 0 010-.142v-.286s0 .065 0 0a1.27 1.27 0 01.04-.16c0-.034.074-.193.023-.087.046-.094.102-.177.153-.269.029-.053-.012.013-.017.02l.06-.073c.037-.041.076-.08.114-.116.039-.036.087-.075.034-.032-.053.044 0 0 .017 0l.136-.084.06-.03s-.087.03-.029.013l.174-.049c.078-.024-.094 0 0 0h.138c.02 0 .114.02.041 0-.072-.019.063.02.083.025.02.004.109.036.04.012-.067-.025.025.012.037.02.048.024.094.052.138.081.087.056-.043-.046.032.027.04.035.08.073.116.114l.048.053c.092.107-.026-.053.012.017.04.07.11.177.158.269 0 .021.034.099 0 0l.024.065c.021.06.04.122.053.184 0 .022.034.165.024.106.011.08.018.162.02.243.004.168-.004.336-.024.503 0-.014 0-.058 0 0s-.015.104-.025.157l-.043.218c-.037.177-.08.354-.121.528a.56.56 0 001.08.298c.183-.753.343-1.523.188-2.297a2.324 2.324 0 00-1.034-1.504 1.743 1.743 0 00-1.84.02 2.268 2.268 0 00-1.008 1.653c-.093.796.222 1.593.65 2.249a.56.56 0 00.969-.567l-.027.022z"
      ></path>
      <path
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth="1.54"
        d="M174.122 131.413s-1.06-12.047 3.336-12.367c4.396-.319 9.397 16.429 2.084 19.919-5.834 1.479-5.42-7.552-5.42-7.552z"
      ></path>
      <path
        fill={secondaryColor}
        d="M174.904 139.193c1.414 1.053 3.428.985 4.96.227 1.743-.859 2.856-2.503 3.539-4.272 1.568-4.074 1.157-8.685-.543-12.636-.568-1.321-2.5-.181-1.936 1.133a14.904 14.904 0 01.726 9.644c-.75 2.818-2.922 5.684-6.151 4.471-.9-.337-1.256.946-.605 1.433h.01z"
      ></path>
      <path
        fill="#fff"
        d="M93.98 109.514c-.091 2.515 2.576 3.967 4.791 3.147 2.721-1.015 3.389-4.077 3.401-6.66 0-1.541.044-2.774 1.513-3.589 1.126-.627 2.353-1.029 3.236-2.019 2.179-2.44 1.053-5.848 1.634-8.74.259-1.286-1.641-1.84-1.982-.548-.617 2.334.22 4.996-.797 7.209-.842 1.832-3.26 2.004-4.521 3.473-1.41 1.641-.845 3.803-1.08 5.761-.152 1.259-.658 2.578-1.813 3.241-1.154.664-2.798.23-2.84-1.27-.026-.993-1.502-.99-1.541 0v-.005zM119.419 104.818c.532 1.789 2.421 2.832 4.236 2.483 2.045-.392 3.474-2.382 3.522-4.403.027-1.164-1.549-1.242-1.917-.259-.349.922-.775 1.992-1.738 2.438-.784.363-1.922.094-2.237-.775-.421-1.152-2.227-.697-1.866.516zM160.792 115.335c.566 1.041 1.975 1.501 3.091 1.211a2.798 2.798 0 002.05-2.644c.056-1.084-1.66-1.324-1.9-.259-.225 1-1.065 1.179-1.803.584-.78-.632-1.964.142-1.438 1.108z"
      ></path>
      <path
        fill={secondaryColor}
        d="M217.431 129.842c-2.633.242-5.272.336-7.91.511-1.281.084-2.559.179-3.837.268-1.104.078-2.355.017-3.42.359-1.709.549-2.048 2.348-2.067 3.919-.034 2.699.014 5.402.022 8.101 0 .898.936 1.337 1.694.969 2.132-1.044 4.585-.826 6.889-.831 2.556 0 5.115-.116 7.661-.338a80.397 80.397 0 003.699-.407c.888-.116 1.859-.208 2.406-1.019.617-.91.302-2.222.242-3.237a1041.2 1041.2 0 01-.254-3.965c-.09-1.433-2.331-1.452-2.242 0 .078 1.245.153 2.489.225 3.733.027.467.049.934.08 1.399.063.889 0 .751-.912.869-2.23.289-4.469.492-6.715.608-3.982.21-8.508-.557-12.202 1.254l1.694.968-.043-6.674c0-.774-.092-1.602.043-2.367.194-1.097 1.073-.993 2.002-1.109 4.316-.53 8.62-1.239 12.945-1.672.848-.085.86-1.421 0-1.339z"
      ></path>
      <path
        fill="#fff"
        d="M131.602 147.222a11.445 11.445 0 007.02 6.657c2.461.801 5.177.752 7.52 1.851 3.433 1.608 5.435 5.786 4.541 9.47-.893 3.684-4.599 6.48-8.38 6.334 3.225.969 6.955 2.452 7.72 5.732.576 2.46-.908 5.03-2.966 6.497-2.057 1.467-4.599 2.063-7.053 2.629 3.953.412 8.675 1.392 10.045 5.12 1.472 4.006-2.21 8.133-6.107 9.871 1.963.411 4.222 1.058 4.967 2.917.702 1.747-.419 3.829-2.079 4.717-1.661.889-3.67.826-5.514.453-11.825-2.389-19.285-12.817-23.502-23.468-5.601-14.143-7.782-35.655 6.17-43.955"
      ></path>
      <path
        fill={secondaryColor}
        d="M126.7 139.282c-5.809 2.297-10.077 6.718-12.364 12.498-2.254 5.686-2.498 12.088-1.842 18.106a64.343 64.343 0 004.875 18.397c3.147 7.346 7.874 14.424 14.712 18.8 3.341 2.138 7.591 3.936 11.619 3.919 2.3 0 4.551-.857 5.839-2.844 1.147-1.769 1.103-4.076-.334-5.669-1.247-1.38-3.179-1.91-4.931-2.278l.293 2.242c4.115-1.903 8.484-6.592 6.555-11.459-1.733-4.372-6.974-5.326-11.113-5.757l.31 2.285c4.645-1.079 10.512-3.079 10.936-8.714.368-4.909-4.774-7.131-8.664-8.293l-.283 2.099c5.505.094 10.227-4.873 9.465-10.409a9.682 9.682 0 00-3.825-6.438c-2.539-1.862-5.749-1.738-8.661-2.547a10.585 10.585 0 01-6.935-6.197c-.363-.9-1.842-.51-1.476.407a12.647 12.647 0 004.485 5.722c2.336 1.637 4.999 1.966 7.717 2.537 2.595.547 4.735 1.733 5.989 4.149 1.099 2.121 1.176 4.706-.02 6.8a7.65 7.65 0 01-6.746 3.834c-1.23-.034-1.416 1.747-.283 2.098 2.844.877 7.404 2.457 6.988 6.231-.484 4.413-5.78 5.672-9.312 6.473-1.375.312-.91 2.154.307 2.287 3.019.329 7.48.937 8.843 4.139 1.607 3.779-2.503 7.262-5.524 8.63-.956.436-.692 2.028.293 2.241 1.385.298 3.59.685 4.154 2.222.658 1.794-1.281 3.244-2.791 3.561-1.99.419-4.181-.215-6.069-.83a23.715 23.715 0 01-4.909-2.271c-6.293-3.805-10.65-10.113-13.686-16.673a61.511 61.511 0 01-4.993-16.862c-.816-5.519-.862-11.338.675-16.736 1.452-5.083 4.497-9.525 9.179-12.117a21.75 21.75 0 012.684-1.254"
      ></path>
      <path
        fill="#fff"
        d="M177.463 159.24c-3.501-3.406-22.512-9.573-20.496.38.305 1.506 1.109 2.856 1.937 4.144a67.7 67.7 0 0012.936 14.722c-1.639 4.921-.33 10.702 3.267 14.437"
      ></path>
      <path
        fill={secondaryColor}
        d="M178.097 158.599c-1.695-1.663-4.115-2.699-6.294-3.534-2.776-1.066-5.729-1.857-8.714-2.01-2.37-.121-5.257.221-6.707 2.353-2.179 3.215.322 7.335 2.132 10.036a69.8 69.8 0 0012.398 13.977l-.341-1.295c-1.658 5.153-.593 12.345 3.975 15.775.927.694 2.159-.647 1.563-1.562-1.345-2.067-2.662-3.933-3.253-6.378a13.314 13.314 0 01.266-7.121c.134-.462.003-.96-.341-1.295a67.409 67.409 0 01-10.137-10.651c-1.453-1.915-3.062-3.955-4.023-6.17-.484-1.094-.843-2.532-.346-3.694.646-1.513 3.047-1.694 4.599-1.656 2.582.051 5.163.676 7.608 1.475 2.12.689 4.662 1.488 6.344 3.03.85.777 2.099-.455 1.268-1.268l.003-.012zM202.637 24.657c2.05.066 4.086.344 6.134.467 1.142.07 1.425-1.825.273-2.018-2.128-.361-4.255-.395-6.407-.463-1.298-.038-1.295 1.976 0 2.014zM28.48 24.9c-1.395-.078-2.646 1.21-2.457 2.614.188 1.404 1.74 2.364 3.088 1.98 1.499-.426 2.118-2.2 1.484-3.554a2.34 2.34 0 00-1.68-1.293 2.205 2.205 0 00-2.309.969c-.833 1.183 1.09 2.69 2.021 1.559.167-.201-.014-.041-.08 0h-.038-.03c-.036-.068-.28-.11-.05 0-.112-.049-.066-.288-.058-.04v.144c.021-.216-.044.099 0 0 .032-.073.017-.051-.044.065a.124.124 0 01.07-.077c0 .014-.053.024-.07.026-.087.017.073.032-.102 0 .199.044-.13-.099 0 0-.104-.075-.179-.094-.189-.157a.484.484 0 01.46-.542c1.075-.032 1.066-1.605 0-1.663l-.016-.032zM39.53 23.919c-1.16-.426-2.535.402-2.803 1.58-.318 1.385.68 2.934 2.013 3.353 1.474.462 2.663-.879 2.632-2.287-.04-1.21-1.073-2.806-2.455-2.663-1.198.123-1.716 1.607-.624 2.31.126.09.268.159.418.2-.104-.031-.084-.012.056.056-.063-.051.039.09.075.15-.075-.124.049.174 0 .155a.104.104 0 01.036-.11 1.37 1.37 0 00.506-.15c-.116-.241-.605-.285-.561-.667a.75.75 0 01.123-.242c.053-.051-.13-.063.111.014 1.097.351 1.523-1.32.47-1.694l.002-.005zM48.827 23.945a2.844 2.844 0 00-.915 2.954 2.549 2.549 0 002.774 1.694 2.237 2.237 0 001.951-2.515c-.167-1.326-1.268-2.227-2.602-2.014-.634.102-1.026.857-.94 1.436.105.694.62 1.055 1.286 1.135-.17-.03-.206-.03-.109 0 .097.026.063.014-.1-.039-.08-.046-.152-.152-.043-.029-.181-.203 0 .102-.077-.157.022.08 0 .266.036.12.022-.082.073-.304 0-.12a.965.965 0 01.162-.242c.075-.049.06-.04-.046.026l.1-.046c-.124.027-.14.034-.049.017.092-.017.075-.014-.056 0 0 .022.17.068-.055-.024-.128-.05.138.06-.06-.044.08.044.096.182.077.07 0-.04-.102-.258-.053-.108-.054-.165-.054 0-.017-.177-.032.145.012-.085.026-.128a.853.853 0 01.187-.325 1.06 1.06 0 000-1.469c-.431-.43-1.03-.353-1.467 0l-.01-.015zM25.974 76.816a857.691 857.691 0 005.74-8.203c1.713-2.467 4.357-5.568 7.312-2.793 2.355 2.212 4.527 4.654 6.778 6.97 2.378 2.449 4.76 4.893 7.145 7.333a.651.651 0 00.9 0c3.345-2.763 6.68-5.531 10.01-8.305.92-.77 2.08-2.058 3.338-1.368.816.448 1.406 1.452 1.983 2.162 1.384 1.72 2.662 3.52 3.916 5.325.436.63 1.465.05 1.038-.608a67.532 67.532 0 00-4.371-5.932c-1.21-1.475-2.486-3.092-4.556-2.104-.968.465-1.791 1.261-2.614 1.936-1.055.865-2.106 1.736-3.159 2.605a2039.211 2039.211 0 00-6.482 5.388h.9a2763.38 2763.38 0 00-8.368-8.472 3211.937 3211.937 0 00-4.025-4.057c-1.027-1.028-2.072-2.316-3.471-2.851-2.561-.968-4.793 1.084-6.229 2.977-2.32 3.057-4.34 6.395-6.448 9.603-.274.419.382.786.666.39l-.003.004z"
      ></path>
      <path
        fill={secondaryColor}
        d="M33.163 68.163c-.755.5-.682 1.527.02 2.086 1.05.835 2.25-.194 2.904-.995l-.842-.218c.242 1.252 1.968 2.063 3.147 2.058 1.099 0 2.198-1.126 1.498-2.179a.547.547 0 00-.997.42l-1.16.483a4.346 4.346 0 01-.605-.242c-.4-.186-.726-.339-.893-.82a.52.52 0 00-.934-.124c-.2.298-.45.56-.739.772-.958.162-1.287-.02-.985-.544.414-.3.032-.993-.409-.7l-.005.003zM64.764 73.466a1.55 1.55 0 001.453 1.198 1.484 1.484 0 001.452-1.198.513.513 0 00-.987-.27.484.484 0 11-.969 0c-.174-.623-1.108-.362-.968.263l.02.007zM52.49 60.564a2.484 2.484 0 00-2.683 2.639c.107 1.58 1.581 2.788 3.09 2.933 1.507.146 3.1-.655 3.63-2.108.51-1.413-.06-3.096-1.411-3.79-.707-.361-1.315.656-.627 1.07 1.733 1.04.866 3.35-.954 3.584a2.38 2.38 0 01-2.285-.968c-.75-1.06-.186-2.624 1.242-2.549.532.027.51-.762 0-.818l-.003.007zM35.722 146.096c1.784 1.845 5.083 1.753 6.712-.273.726-.893 1.167-2.481.08-3.297-.888-.668-2.217-.172-2.706.755-.649 1.225.242 2.626 1.399 3.147a3.503 3.503 0 001.975.203c1.237-.198 2.355-1.266 3.58-.629.896.462 1.666 1.101 2.607 1.513.754.329 1.535.588 2.336.774 1.863.421 3.793.444 5.664.068.71-.138.407-1.21-.297-1.079a12.486 12.486 0 01-6.735-.569c-1.103-.422-2.03-1.032-3.016-1.663-.75-.484-1.406-.588-2.258-.264-1.176.448-2.631 1.365-3.808.394-.702-.581-.67-2.161.47-1.638.634.29.484.806.196 1.343a2.809 2.809 0 01-.423.581c-1.356 1.438-3.813 1.438-5.185.053-.38-.385-.969.204-.591.591v-.01zM65.924 149.744c.634 0 .636-.985 0-.985-.637 0-.634.985 0 .985zM206.44 66.175c.484-.452.927-.924 1.382-1.396.646-.673.968-1.063 1.847-.45 1.116.774 2.096 1.89 3.132 2.774.518.44 1.268-.286.755-.756-.807-.73-1.618-1.45-2.435-2.156-.501-.429-1.162-1.21-1.844-1.38-.569-.143-.969.126-1.368.513-.726.71-1.399 1.493-2.053 2.268a.413.413 0 00.584.583zM101.175 50.984c3.534 4.616 4.805 10.202 4.311 15.93-.056.643 1.041.803 1.14.154.898-5.906-1.101-11.974-4.841-16.552-.274-.334-.871.121-.605.468h-.005zM105.885 73.314V73.53c0 .09.025.18.071.257l.087.111a.376.376 0 00.159.105.354.354 0 00.192.04.485.485 0 00.351-.145c.031-.036.06-.075.087-.11a.504.504 0 00.07-.258V73.314a.518.518 0 10-1.036 0h.019zM167.846 48.408a20 20 0 012.101 5.892c.128.622 1.04.348.941-.26a16.61 16.61 0 00-2.328-6.05.414.414 0 00-.714.416v.002zM171.428 61.01c.603 0 .603-.937 0-.937s-.603.937 0 .937zM110.284 184.257a10.471 10.471 0 002.808 5.166c.501.498 1.246-.257.772-.77a11.004 11.004 0 01-2.614-4.657c-.165-.622-1.107-.361-.969.263l.003-.002zM109.461 188.793a3.07 3.07 0 001.246 1.319c.557.308.993-.484.484-.839a2.866 2.866 0 01-.871-.986.501.501 0 00-.867.506h.008zM201.724 175.737c2.506.014 5.013.012 7.521.014.61 0 .61-.946 0-.944-2.508 0-5.015 0-7.521.015a.457.457 0 100 .915zM201.928 184.291l1.997 1.52c.551.424 1.103-.523.547-.937l-2.012-1.493c-.547-.407-1.063.506-.532.91zM198.335 193.213l1.998 2.518c.394.484 1.096-.209.699-.7l-2.009-2.508c-.39-.484-1.06.201-.68.681l-.008.009zM131.585 163.825c.903.544 1.801 1.094 2.713 1.619.601.346 1.133-.571.543-.925-.903-.542-1.821-1.062-2.733-1.585a.517.517 0 00-.523.891zM129.438 180.595l1.878.842a.55.55 0 00.806-.565.55.55 0 00-.382-.437l-1.905-.777c-.535-.22-.93.699-.397.939v-.002zM130.651 194.721l1.084.276c.622.16.888-.808.264-.968l-1.085-.266c-.617-.153-.881.796-.263.953v.005z"
      ></path>
    </svg>
  );
}

export default PaintRollerIllustration;
