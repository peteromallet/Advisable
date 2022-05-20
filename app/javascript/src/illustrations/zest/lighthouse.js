import React from "react";

function LighthouseIllustration({
  primaryColor = "#FFCE00",
  secondaryColor = "#232323",
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 1000 1000" {...props}>
      <path
        fill={secondaryColor}
        d="M625.156 698.43a83.544 83.544 0 019.428-64.895c2.94-4.734 9.163-9.594 13.328-5.88a9.57 9.57 0 012.44 4.635 68.603 68.603 0 01-.559 40.239 61.002 61.002 0 0129.733-28.753c2.166-.98 4.538-1.813 6.86-1.313 4.518.98 6.419 6.409 6.674 11.025a39.506 39.506 0 01-13.249 31.458c3.635-3.626 7.526-7.39 12.485-8.713 4.959-1.323 11.26.882 12.573 5.88a12.082 12.082 0 01-.764 7.125 34.301 34.301 0 01-11.868 15.994c9.937-3.43 21.795-6.625 30.243-.363a16.257 16.257 0 01-8.173 29.263s-52.636 20.002-74.245 6.262c-21.609-13.74-14.906-41.964-14.906-41.964z"
      ></path>
      <path
        fill={secondaryColor}
        d="M627.047 697.96a81.894 81.894 0 011.774-47.638 77.705 77.705 0 014.821-11.162c1.715-3.254 3.509-6.576 6.429-8.898 2.156-1.715 5.537-3.146 7.321-.177a20.728 20.728 0 011.881 5.753 65.238 65.238 0 011.264 6.605A67.258 67.258 0 01647.901 672c-.676 2.087 2.597 3.528 3.587 1.509a59.5 59.5 0 0125.274-26.215c2.578-1.372 6.057-3.528 9.095-2.94 2.244.431 3.616 2.528 4.321 4.547 1.96 5.429.98 11.946-.637 17.327a37.714 37.714 0 01-11.132 17.326l2.773 2.773c4.488-4.449 10.3-10.201 17.228-8.006 2.578.823 4.675 2.822 4.744 5.654.088 3.646-1.902 7.507-3.764 10.545a32.164 32.164 0 01-8.153 8.987 1.96 1.96 0 00-.804 2.46 1.96 1.96 0 002.313 1.136 70.06 70.06 0 0113.583-3.586c4.194-.559 8.761-.471 12.622 1.46 7.693 3.851 10.535 13.877 5.576 21.021a14.808 14.808 0 01-9.907 6.076c-.795.128-1.574.341-2.323.637a207.725 207.725 0 01-11.035 3.577c-12.377 3.655-25.264 6.595-38.22 6.86-6.105.137-12.367-.314-18.11-2.538-6.096-2.362-11.388-7.556-14.514-13.387a38.657 38.657 0 01-4.283-17.189c-.078-2.313 0-4.628.236-6.929 0-.451.098-.892.147-1.333.049-.441 0 .157 0-.137l.088-.588c.078-.529.166-1.049.274-1.568 0-.176.069-.363.118-.549.578-2.46-3.205-3.508-3.793-1.039a45.638 45.638 0 00-.98 8.82 46.059 46.059 0 002.94 18.385 34.714 34.714 0 0014.877 17.523c5.605 3.194 12.25 4.233 18.62 4.468 13.984.52 28.145-2.557 41.512-6.36 4.263-1.215 8.507-2.538 12.682-4.018.666-.235 1.323-.519 1.96-.715-.471.137.588-.069.695-.088a14.91 14.91 0 001.715-.343 19.357 19.357 0 003.411-1.274 18.787 18.787 0 005.439-4.018c6.515-7.117 6.417-18.061-.226-25.059-7.026-7.428-18.071-6.546-27.087-4.116-2.381.637-4.733 1.401-7.066 2.205l1.519 3.587a37.372 37.372 0 009.046-9.575c2.401-3.685 4.625-8.251 4.821-12.74.353-8.526-9.368-12.387-16.444-9.908-4.9 1.696-8.644 5.292-12.23 8.82-1.813 1.794.891 4.44 2.773 2.774a41.42 41.42 0 0011.544-17.229c2.176-6.115 3.274-13.445 1.666-19.825a12.635 12.635 0 00-4.694-7.477c-3.244-2.254-7.164-1.431-10.545 0a61.338 61.338 0 00-17.15 11.181 62.668 62.668 0 00-13.906 18.591l3.587 1.509a70.35 70.35 0 002.989-28.89 56.054 56.054 0 00-2.94-14.024c-1.499-3.92-4.851-6.527-9.173-5.488-3.822.921-7.017 4.067-9.173 7.203a66.752 66.752 0 00-6.085 11.603 87.024 87.024 0 00-6.517 25.853 84.598 84.598 0 002.469 29.674c.657 2.45 4.449 1.411 3.793-.98z"
      ></path>
      <path
        fill={primaryColor}
        d="M402.735 729.584l56.703-422.703 120.658-1.039 63.964 421.665-241.325 2.077z"
      ></path>
      <path
        fill={primaryColor}
        d="M402.735 729.584l56.703-422.703 120.658-1.039 63.964 421.665-241.325 2.077zM457.38 183.201l117.821-1.007.806 94.252-117.821 1.008-.806-94.253z"
      ></path>
      <path
        fill={secondaryColor}
        stroke={secondaryColor}
        strokeWidth="1.34"
        d="M581.977 166.133l-14.298.128c-2.496-27.935-26.025-49.271-54.07-49.03-28.045.241-51.205 21.978-53.221 49.951l-14.298.118a8.173 8.173 0 00-8.085 8.232l.098 10.29a8.144 8.144 0 008.222 8.085l135.877-1.167a8.163 8.163 0 008.085-8.232l-.088-10.29a8.152 8.152 0 00-8.222-8.085z"
      ></path>
      <path
        fill="#fff"
        d="M509.124 276.56c-11.887-7.693-17.003-24.892-18.826-34.829-.901-4.9-1.156-9.957.226-14.7 1.568-5.41 5.145-10.026 9.192-13.936 5.762-5.586 13.279-10.202 21.286-9.604a24.928 24.928 0 0112.377 4.9 38.025 38.025 0 0115.68 30.968c-.176 12.025-7.556 30.478-17.552 37.181"
      ></path>
      <path
        fill="#fff"
        d="M509.124 276.56c-11.887-7.693-17.003-24.892-18.826-34.829-.901-4.9-1.156-9.957.226-14.7 1.568-5.41 5.145-10.026 9.192-13.936 5.762-5.586 13.279-10.202 21.286-9.604a24.928 24.928 0 0112.377 4.9 38.025 38.025 0 0115.68 30.968c-.176 12.025-7.556 30.478-17.552 37.181M584.015 331.175v-.294c-16.072 6.508-31.889 13.858-48.118 19.943l-73.696 30.302c-3.518 1.45-7.144 2.754-10.594 4.361-6.507 3.038-4.9 14.269-5.439 20.021-.774 8.732-2.303 17.464-3.469 26.157l-3.312 24.656c-.275 2.088-2.019 8.732.166 9.8 1.96.98 9.006-3.087 10.908-3.92 31.448-13.377 62.955-26.46 94.56-39.445l35.339-14.513c3.714-1.529 7.624-2.646 11.26-4.361 3.312-1.568 3.067-1.96 2.489-5.822-.653-4.482-1.333-8.96-2.038-13.435l-8.056-53.45zM604.252 467.592c-13.181 3.92-26.087 10.623-38.818 15.866l-77.508 31.879-56.046 23.06c-.794.323-2.538.666-3.146 1.293-3.067 3.166-2.616 15.621-3.253 20.355 0 19.864-7.468 39.709-7.84 59.574 6.203-.157 14.925-5.753 20.834-8.183l108.359-44.6c0-1.068 14.769-6.076 16.425-6.752l17.983-7.399a4657.802 4657.802 0 0029.498-12.152c2.695-1.107 3.92-.98 4.429-3.577.422-2.323-.921-6.056-1.283-8.418l-3.92-25.97-2.676-17.64c-.813-5.086-.637-12.907-3.038-17.336zM625.068 606.506c-2.529-.921-7.38 1.725-9.8 2.666-8.125 3.175-15.867 7.203-23.922 10.515l-75.176 30.919-75.039 30.88-24.627 10.133c-2.44.98-6.233 1.608-8.173 3.499-2.127 2.068-1.96 5.811-2.333 8.761l-3.175 25.715c35.907-.401 71.824-.588 107.732-.931l77.116-31.683a24816.914 24816.914 0 0146.903-19.277c.489-.15.925-.44 1.254-.833a2.705 2.705 0 00.206-1.96l-8.115-54.448c-.401-2.715-.205-11.457-1.96-13.368a2.273 2.273 0 00-.891-.588z"
      ></path>
      <path
        fill={secondaryColor}
        d="M512.642 109.372c0-4.41 6.438-3.362 8.82-1.96 3.479 2.019 4.037 5.37 4.41 9.035.421 4.058 6.38 5.508 7.536.98 2.136-8.3-4.302-16.748-12.338-18.62-7.664-1.764-16.258 2.695-14.916 11.359.569 3.714 6.468 2.753 6.449-.873l.039.079z"
      ></path>
      <path
        fill="#112870"
        d="M587.651 286.487c.817 5.43.691 10.96-.372 16.347a2.948 2.948 0 105.684 1.568 53.742 53.742 0 00.372-19.473 2.94 2.94 0 00-3.626-2.058 3.029 3.029 0 00-2.058 3.616z"
      ></path>
      <path
        fill={primaryColor}
        d="M515.317 201.022c-.137 9.731-2.038 19.315-1.597 29.057a3.009 3.009 0 002.94 2.94 2.94 2.94 0 002.94-2.94c-.441-9.742 1.47-19.326 1.597-29.057.059-3.783-5.88-3.793-5.88 0z"
      ></path>
      <path
        fill={secondaryColor}
        d="M447.599 273.865c-.862-8.31-1.323-17.003-.088-25.304l-3.92 2.94c13.397-.597 26.744-2.185 40.18-2.822a649.407 649.407 0 0140.268-.657c13.106.177 26.199.752 39.279 1.725 3.508.265 7.007.549 10.515.863 2.381.215 7.487-.314 9.545.813 2.842 1.558 1.549 6.654 1.451 9.369-.138 3.743-.647 7.595-.275 11.319.412 4.155 6.674 5.723 7.781 1.058.67-3.455.998-6.967.98-10.486.138-3.675.618-7.761.079-11.397-.912-6.184-5.351-7.732-10.957-8.467-15.493-2.019-31.262-2.754-46.873-3.244a672.519 672.519 0 00-46.06.166c-15.611.608-31.556 1.216-46.971 3.842-1.755.304-2.94 2.244-2.94 3.92-.392 9.112.077 18.24 1.401 27.264.598 3.694 6.987 2.881 6.595-.892l.01-.01z"
      ></path>
      <path
        fill={secondaryColor}
        d="M555.488 246.445c-.578 7.32-1.284 14.7-1.176 22.03.078 5.077 8.065 5.067 7.889 0-.255-7.36-.765-14.7-.578-22.03.098-3.989-5.88-3.92-6.135 0zM518.757 245.778c-.402 8.134-1.156 16.954 0 25.029.676 4.793 7.262 2.94 7.742-1.048.98-7.703-.059-16.239-.568-23.981-.304-4.576-6.919-4.625-7.154 0h-.02zM472.609 248.14a204.817 204.817 0 01.98 22.981c0 5.057 7.84 5.067 7.84 0a125.81 125.81 0 00-2.548-23.833c-.647-3.528-6.762-2.764-6.321.852h.049z"
      ></path>
      <path
        fill={primaryColor}
        d="M438.639 288.344c-.075-8.809 7.005-16.011 15.813-16.086l129.119-1.104c8.809-.076 16.011 7.004 16.086 15.813l.08 9.338c.075 8.808-7.004 16.01-15.813 16.086l-129.119 1.104c-8.809.075-16.01-7.005-16.086-15.813l-.08-9.338z"
      ></path>
      <path
        fill={secondaryColor}
        d="M504.841 490.2a42.664 42.664 0 012.078-21.991 16.273 16.273 0 013.92-6.517 7.359 7.359 0 017.105-1.823c3.538 1.215 4.9 5.419 5.625 9.104a112.845 112.845 0 012.048 21.178l-15.68.078"
      ></path>
      <path
        fill={secondaryColor}
        d="M506.732 489.631a40.542 40.542 0 010-13.19c.686-4.067 1.794-8.762 4.332-12.113 2.028-2.666 6.017-4.175 8.369-1.059 2.215 2.94 2.548 7.341 3.067 10.839a111.91 111.91 0 011.186 15.994l1.96-1.96-15.68.068c-2.518 0-2.528 3.92 0 3.92l15.68-.078a1.96 1.96 0 001.96-1.96 117.755 117.755 0 00-1.284-16.807c-.637-4.312-1.185-9.241-4.057-12.74-3.136-3.822-8.477-3.734-12.191-.794-3.714 2.94-5.527 8.409-6.595 13.005a45.701 45.701 0 00-.539 17.904 1.958 1.958 0 002.42 1.372 1.96 1.96 0 001.372-2.41v.009zM508.066 354.176c-.637-3.626-1.274-7.399-.324-10.966.951-3.568 3.92-6.86 7.654-6.86 3.518 0 6.478 2.94 7.625 6.272 1.146 3.332.862 6.948.568 10.456l-12.809.177"
      ></path>
      <path
        fill={secondaryColor}
        d="M509.966 353.656c-.833-4.674-1.871-10.868 2.431-14.249 3.41-2.675 7.526.088 8.82 3.871 1.039 3.156.715 6.537.441 9.8l1.96-1.96-12.809.177c-2.528 0-2.538 3.92 0 3.92l12.809-.177a1.96 1.96 0 001.96-1.96c.294-3.538.549-7.222-.529-10.662a11.938 11.938 0 00-5.39-6.86 8.565 8.565 0 00-8.497.049 11.816 11.816 0 00-5.223 6.86c-1.176 3.998-.441 8.242.264 12.26a1.962 1.962 0 002.421 1.372 2.03 2.03 0 001.372-2.421l-.03-.02zM500.372 705.878a182.24 182.24 0 012.264-26.46c.98-5.88 2.94-12.583 8.741-14.563a11.382 11.382 0 019.301 1.245 18.878 18.878 0 016.428 6.86c6.018 10.28 5.243 22.844 4.303 34.614"
      ></path>
      <path
        fill={secondaryColor}
        d="M502.332 705.878c.094-7.31.631-14.608 1.608-21.854.666-4.9 1.195-11.044 4.674-14.935 4.018-4.488 10.329-2.754 14.053 1.186 4.116 4.341 6.086 10.535 6.86 16.337.98 6.958.422 14.063-.137 21.021-.196 2.518 3.724 2.508 3.92 0 1.059-13.221 1.96-28.812-7.389-39.543-4.312-4.959-12.005-7.752-17.885-3.734-4.743 3.253-6.468 9.202-7.35 14.592a185.058 185.058 0 00-2.342 26.93c0 2.529 3.92 2.529 3.92 0h.068z"
      ></path>
      <path
        fill={primaryColor}
        d="M290.182 857.22c-55.292-63.406 66.405-175.028 226.644-169.609 67.326 2.274 128.469 47.481 207.016 37.015 115.542-15.406 162.993 134.466 40.581 137.455-24.215 36.985-435.923 39.053-474.241-4.861z"
      ></path>
      <path
        fill="#fff"
        d="M65.654 938.667V808.083l20.58-7.762c25.941 5.233 54.429-5.282 70.746-26.117 7.84 22.736 30.077 39.759 54.077 41.385 24 1.627 48.324-12.26 59.143-33.731 34.545 34.143 101.332 23.961 124.117-18.934a87.673 87.673 0 00142.561-13.72 90.073 90.073 0 00143.08 30.821c8.771 24.294 38.798 35.28 64.268 30.988 25.47-4.293 47.363-19.914 68.237-35.123-1.96 1.411 21.56 15.895 23.775 16.758a64.498 64.498 0 0031.36 3.802c10.016-1.304 18.493-5.488 27.234-10.251 9.202-5.018 16.2-14.935 26.049-18.424a91.78 91.78 0 0044.619 22.374v148.518H65.654z"
      ></path>
      <path
        fill={secondaryColor}
        d="M66.409 810.817l15.523-5.704c2.077-.764 4.184-1.597 5.586-1.46 5.35.519 10.456 1.323 15.876 1.088 21.364-.902 42.865-11.006 56.35-27.744l-6.596-1.744c8.575 24.117 30.88 41.924 56.468 44.364 26.068 2.489 52.263-12.563 64.268-35.593l-6.752.872c28.763 27.959 77.371 28.351 109.123 5.086a75.283 75.283 0 0021.903-24.804l-7.036.912c19.698 22.432 50.44 34.692 80.193 31.095a94.081 94.081 0 0069.355-45.756h-7.635c11.829 26.509 36.574 47.108 64.876 53.704 29.949 6.977 62.142-1.735 85.016-22.089l-7.154-1.892c8.82 23.138 33.633 34.927 57.369 34.986 30.811.079 57.643-19.139 81.467-36.485l-5.292-6.86c-5.106 6.429 6.566 12.377 10.78 15.19 6.86 4.557 13.632 8.82 21.658 10.976a66.644 66.644 0 0044.365-3.558 81.49 81.49 0 0018.845-11.054c5.39-4.371 10.368-9.722 16.964-12.27l-4.351-1.146c13.19 11.917 29.174 20.325 46.765 23.304 5.273.892 7.654-6.938 2.254-8.163-15.797-3.597-30.497-10.604-42.659-21.472a4.439 4.439 0 00-4.351-1.156c-10.633 4.155-17.376 13.396-27.078 18.943-12.22 6.968-24.921 11.309-39.151 9.967a49.256 49.256 0 01-23.098-8.154 781.69 781.69 0 01-8.899-5.88c-1.244-.872-2.509-1.735-3.665-2.705-.284-.235-.98-1.137-1.313-1.156-.755 0 .549-.784.314 1.597l-1.284 3.087.098-.117c2.783-3.509-.912-10.065-5.302-6.86-21.491 15.68-45.55 33.81-73.128 35.456-20.991 1.254-45.168-7.654-53.047-28.675a4.344 4.344 0 00-7.154-1.891c-20.903 18.62-50.843 26.352-78.077 19.502-25.931-6.527-47.304-25.225-58.123-49.52-1.392-3.126-6.106-2.626-7.635 0-13.171 22.54-37.034 38.691-63.18 41.494-27.166 2.94-54.469-8.262-72.393-28.705-1.881-2.146-5.723-1.509-7.036.902-21.962 40.405-84.074 50.274-117.218 18.159-1.901-1.842-5.449-1.636-6.752.873-10.486 20.119-32.595 33.133-55.439 31.673-22.324-1.421-42.708-17.405-50.264-38.279-.902-2.479-4.586-4.272-6.595-1.734-13.583 17.042-33.869 27.293-55.86 27.067a64.899 64.899 0 01-8.507-.607c-1.49-.216-3.008-.755-4.508-.471-1.96.373-3.979 1.549-5.802 2.254l-14.611 5.684c-3.352 1.294-1.96 6.743 1.509 5.469h.02zM566.013 886.747a167.057 167.057 0 0079.439-20.051l-5.88-1.528c15.827 20.776 43.914 25.293 67.542 16.346a90.945 90.945 0 0017.718-9.045c2.234-1.47 5.645-5.234 8.32-5.792 2.391-.5 4.469 3.459 6.164 5.204a62.802 62.802 0 0029.459 16.777 61.943 61.943 0 0039.2-2.548c5.41-2.273 3.107-11.231-2.469-8.957a55.573 55.573 0 01-40.896.412 52.185 52.185 0 01-17.757-11.27c-5.018-4.9-8.732-11.496-16.778-8.507-3.234 1.196-5.88 3.714-8.644 5.655a88.957 88.957 0 01-11.221 6.625 64.234 64.234 0 01-24 6.732c-15.268.98-30.38-4.625-39.925-16.817-1.176-1.499-3.675-1.509-5.184-.676a172.339 172.339 0 01-75.127 21.09c-4.067.196-4.116 6.34 0 6.35h.039zM182.882 890.55a41.16 41.16 0 0043.884-3.803c2.107-1.617 3.744-3.636 5.723-5.36 3.274-2.833 6.135-.432 9.399 1.274 21.148 11.083 48.294 11.446 68.805-1.274 4.459-2.764.569-9.193-4.076-6.968a73.68 73.68 0 01-33.271 7.575 64.52 64.52 0 01-16.572-2.509c-5.625-1.626-10.447-4.498-15.788-6.722-4.508-1.872-9.094-1.96-12.858 1.46-3.763 3.42-6.399 7.154-10.976 9.702a34.202 34.202 0 01-31.066 1.146c-3.645-1.744-6.86 3.577-3.204 5.479zM615.12 202.139c82.448-20.012 164.297-41.885 245.451-66.64a3760.89 3760.89 0 0069.306-21.903c2.175-.716 1.254-4.165-.98-3.46a5678.01 5678.01 0 01-244.158 71.227c-23.402 6.223-46.824 12.446-70.354 18.218-1.676.412-.98 2.999.716 2.587l.019-.029zM626.537 302.922c42.14 6.586 84.447 12.642 126.714 18.669 41.797 5.958 83.79 11.172 125.332 18.747a577.376 577.376 0 0168.189 16.366c2.567.804 3.665-3.224 1.107-4.027-39.974-12.525-81.448-19.003-122.823-24.902a51459.622 51459.622 0 00-126.528-17.895 7134.984 7134.984 0 00-71.638-9.575c-1.46-.186-1.813 2.352-.353 2.578v.039zM101.865 85.166a13417.872 13417.872 0 01240.365 73.686c22.491 7.174 44.854 14.838 67.473 21.56 2.489.745 3.459-2.998 1.068-3.841-39.602-14.024-80.056-26.029-120.187-38.436a9555.184 9555.184 0 00-119.864-36.162 7172.727 7172.727 0 00-68.081-19.6 1.45 1.45 0 00-.774 2.793zM114.86 399.825c81.507-26.705 162.347-55.116 242.374-85.956 22.226-8.565 44.619-16.895 66.483-26.352 1.842-.794.519-3.969-1.382-3.264-40.18 14.877-79.831 31.252-119.991 46.237a5514.927 5514.927 0 01-119.207 42.943c-23.001 7.987-45.972 15.994-69.071 23.667-1.734.578-.98 3.322.765 2.754l.029-.029zM630.017 229.52c37.318-4.312 74.813-8.977 111.769-15.798 2.518-.46 1.401-4.135-1.049-3.792-37.073 5.292-74.029 11.397-111.142 16.474-1.754.235-1.362 3.322.422 3.116zM775.468 208.362c2.479 0 2.479-3.852 0-3.852s-2.479 3.852 0 3.852zM643.403 278.226c35.094 2.176 70.158 4.626 105.262 6.703 2.45.147 2.43-3.655 0-3.802-35.084-2.166-70.178-3.969-105.262-6.037-2.019-.117-2.009 3.009 0 3.136zM798.116 289.633c14.611 2.293 29.204 4.567 43.904 6.733 2.381.353 3.4-3.293.98-3.646-14.7-2.126-29.332-4.135-44.012-6.135-1.96-.264-2.862 2.735-.843 3.048h-.029zM886.512 299.894a1.559 1.559 0 100-3.118 1.559 1.559 0 000 3.118zM180.98 337.379c61.878-26.009 125.842-46.295 190.885-62.652 2.195-.548 1.264-3.92-.931-3.39-65.474 15.15-129.272 37.132-190.973 63.621-1.362.578-.362 3.009.98 2.421h.039zM262.085 174.895c24.128 6.223 48.197 12.642 72.373 18.688 2.382.598 3.401-3.077.98-3.684-24.157-6.106-48.412-11.849-72.618-17.778-1.793-.431-2.558 2.303-.764 2.774h.029zM312.055 234.244a135.673 135.673 0 0141.67 1.068c2.195.402 3.146-2.94.931-3.371a128.44 128.44 0 00-43.032-.892c-1.793.265-1.391 3.43.431 3.195zM398.306 238.771a1.704 1.704 0 000-3.4 1.704 1.704 0 000 3.4zM210.674 170.034a1.891 1.891 0 000-3.773 1.891 1.891 0 000 3.773z"
      ></path>
      <path
        fill={secondaryColor}
        d="M438.26 306.293c-.872 16.856 23.765 11.76 33.457 11.486 19.433-.529 38.877-.98 58.32-1.47 9.163-.245 18.355-.343 27.518-.804 4.988-.264 15.582-2.009 18.777 2.94 3.058 4.753 2.107 12.525 2.94 17.964 1.382 9.633 3.009 19.237 4.528 28.841a18129.353 18129.353 0 0038.778 234.759c7.595 44.286 14.7 88.729 23.569 132.79 1.049 5.233 8.693 2.94 7.899-2.176-6.135-39.278-13.544-78.4-20.355-117.531a16388.942 16388.942 0 01-20.011-116.551 41379.136 41379.136 0 01-19.434-116.101c-2.94-17.591-6.409-35.192-8.3-52.92-.569-5.38-1.166-11.985-5.518-15.788-4.537-3.92-11.838-3.92-17.502-3.783-20.414.628-40.827 1.676-61.241 2.431-10.535.392-21.089.607-31.605 1.264-6.066.382-26.705 5.37-26.362-5.361.108-3.518-5.282-3.488-5.468 0l.01.01z"
      ></path>
      <path
        fill={secondaryColor}
        d="M455.812 315.055c-5.364 46.7-11.045 93.361-17.042 139.983-6.86 53.782-13.995 107.525-22.05 161.141-3.92 25.99-7.948 51.94-12.368 77.891-.882 5.174 6.987 7.438 7.958 2.195 9.074-48.893 16.003-98.177 22.726-147.431a6749.177 6749.177 0 0020.002-160.828 2704.95 2704.95 0 007.124-72.951c.353-4.107-5.88-3.979-6.35 0zM711.944 744.814a55.249 55.249 0 0115.965 19.022c2.165 4.086 8.241.48 6.174-3.607a57.995 57.995 0 00-18.748-21.227c-3.567-2.508-6.86 3.283-3.391 5.812zM336.418 720.578c-3.283-1.96-6.223-5.684-5.282-9.721.637-2.725 4.626-5.743 7.36-3.587 2.94 2.313 7.908.294 6.713-3.92-1.96-6.958 6.762-14.151 11.936-7.321 2.715 3.587 9.055 1.715 7.713-3.243-1.549-5.704-.755-11.623 3.675-15.906 3.871-3.734 12.946-4.988 13.044 2.558l8.104-1.098c-2.107-6.419-.343-14.2 6.468-17.061 4.714-1.96 2.852-9.722-2.166-7.84-11.044 4.086-17.365 17.228-11.838 28.116 1.803 3.557 8.036 1.96 7.683-2.088-.921-10.927-12.554-16.748-22.285-12.142-10.545 4.998-14.857 18.297-10.398 28.734l6.625-5.106c-4.831-5.331-12.867-7.546-19.414-3.92a15.681 15.681 0 00-6.86 18.434l5.88-4.538c-6.135-4.439-15.121-1.381-18.296 5.243-3.656 7.625 1.626 15.867 8.437 19.355 3.283 1.686 6.135-3.096 2.94-4.978l-.039.029zM385.34 701.273c.3-.262.32-.281.059-.059.177-.117.36-.225.548-.324.373-.186.392-.196.059 0l.461-.137c.154-.045.311-.081.47-.108-.402 0-.392 0 0 0s.843-.088 1.274-.088c3.783 0 4.489-5.468.892-6.536a9.082 9.082 0 00-8.653 2.41 3.469 3.469 0 000 4.9 3.517 3.517 0 004.9 0l-.01-.058zM675.214 601.273a179.62 179.62 0 0036.133-36.201c8.408-11.309 19.11-30.654 36.123-26.803 8.879 2.009 15.68 9.389 22.109 15.278a868.278 868.278 0 0021.001 18.503 955.522 955.522 0 0044.1 35.28c17.258 12.946 34.859 25.97 53.518 36.838 2.146 1.254 3.92-1.891 1.96-3.283-16.474-11.652-33.408-22.54-49.647-34.565a889.572 889.572 0 01-48.363-38.376 1015.781 1015.781 0 01-23.079-20.247c-5.664-5.116-11.652-10.535-19.139-12.74-14.642-4.342-25.99 6.948-34.026 17.64-6.262 8.34-12.034 16.924-19.022 24.706a186.812 186.812 0 01-23.334 21.814c-1.215.98.422 3.097 1.666 2.156z"
      ></path>
      <path
        fill={secondaryColor}
        d="M721.049 575.088c-.627 6.262 4.9 11.407 10.692 12.534 2.702.574 5.521.153 7.938-1.186 1.538-.892 2.42-2.411 3.861-3.381 3.018-2.019 5.164-.882 7.938.725 2.587 1.49 5.302 3.244 8.428 2.813 4.028-.549 5.135-4.018 8.065-6.164 4.224-3.107 9.741.637 14.191-2.215 2.489-1.607 3.753-4.087 2.822-6.948-.823-2.539-4.822-1.47-4.028 1.107 1.362 4.42-8.986 2.313-11.093 2.685a9.701 9.701 0 00-5.645 3.303c-2.519 2.646-3.989 5.086-8.095 3.449-2.372-.98-4.312-2.763-6.762-3.577-5.145-1.705-7.027 1.5-10.653 4.342-5.821 4.567-14.317-.657-14.553-7.487a1.558 1.558 0 00-3.106 0zM35.167 614.572a307.587 307.587 0 0064.464-36.897c17.797-13.358 33.986-29.243 53.714-39.847 9.8-5.263 20.58-8.996 31.801-9.085 12.142-.098 23.402 4.283 33.702 10.408 10.78 6.409 20.756 14.249 30.87 21.658l33.702 24.647c25.039 18.326 49.98 36.809 75.235 54.88 2.332 1.666 4.469-2.146 2.224-3.822-23.069-17.189-46.422-34.006-69.687-50.96l-35.28-25.676c-10.555-7.683-20.923-15.817-32.046-22.667-19.355-11.898-40.406-16.288-61.966-7.811-20.531 8.105-37.308 23.295-54.155 37.093a324.2 324.2 0 01-73.911 45.766c-1.568.696-.206 2.94 1.333 2.293v.02z"
      ></path>
      <path
        fill={secondaryColor}
        d="M145.417 556.164c-4.44 6.262-.598 15.102 6.076 18.022 8.898 3.92 18.13-3.116 22.265-10.604l-2.381.98c8.82 1.598 17.973 4.224 26.901 4.626 6.017.274 12.162-2.999 12.024-9.643l-3.841 1.587c4.312 4.273 10.515 7.605 16.66 5.381 5.184-1.872 8.702-7.644 6.791-12.995-.98-2.646-4.9-1.627-4.243 1.166 1.117 4.626-2.744 8.144-7.252 7.918-3.489-.176-6.38-2.283-8.82-4.645a2.273 2.273 0 00-3.842 1.588c.196 8.124-12.524 4.498-17.052 3.714a5971.2 5971.2 0 00-16.248-2.764 2.179 2.179 0 00-2.382.98c-2.94 5.557-9.163 11.506-16.111 9.653-5.517-1.47-9.094-8.339-5.772-13.288 1.186-1.755-1.617-3.342-2.822-1.647l.049-.029zM431.4 402.049a21.5 21.5 0 00-21.354 5.557l2.675.705c-5.459-14.092-22.413-22.344-36.995-18.522-20.913 5.469-21.56 30.929-11.084 46.129l3.538-2.734c-5.174-5.067-13.475-6.282-19.522-1.911-6.046 4.37-7.34 12.681-4.204 19.178l3.136-3.126c-12.318-6.331-27.557-4.567-37.24 5.674-6.262 6.596-14.572 23.52-1.734 27.862 6.987 2.352 15.797 1.117 23.03 1.185l27.126.245c18.708.177 37.495.863 56.203.412 2.94-.069 2.94-4.41 0-4.528-28.038-1.176-56.242-.568-84.28-.803-6.105-.049-12.995.784-19.002-.5-4.645-.98-5.704-3.998-4.645-8.477a26.468 26.468 0 013.41-8.046c7.448-11.76 22.638-15.327 34.868-9.075a2.313 2.313 0 003.136-3.136c-5.174-10.642 8.183-19.952 16.582-11.76 1.764 1.715 5.037-.568 3.538-2.734-9.065-13.102-9.575-35.946 9.212-40.317 12.358-2.862 27.048 3.92 31.889 15.827a1.617 1.617 0 002.675.706 18.14 18.14 0 0118.317-5.008 1.453 1.453 0 10.774-2.803h-.049zM757.965 101.816c2.127 2.117 5.057 5.273 3.744 8.536-1.235 3.048-5.4 4.704-8.213 5.753-9.653 3.635-20.325 4.38-30.527 5.047-17.071 1.117-44.678 4.145-49.225-18.189-.931-4.547-.716-10.28 2.244-14.112 3.538-4.587 8.82-2.695 12.897.108 1.568 1.078 3.449-.383 3.547-2.039.245-4.537.98-10.398 4.254-13.906 2.802-3.009 8.692-3.92 10.838.235a2.383 2.383 0 004.087 0c4.322-8.506 15.945-12.495 24.284-7.203 8.34 5.292 9.428 18.326 2.94 25.53-1.097 1.234-.813 3.615 1.049 3.978 6.243 1.215 12.603 2.48 17.542 6.782 2.303 1.96 5.694-1.353 3.371-3.381-5.645-4.9-12.446-6.596-19.6-7.987l1.059 3.978c8.202-9.172 7.379-24.921-2.94-32.34-10.32-7.418-26.088-2.94-31.772 8.232h4.087c-2.872-5.537-10.026-6.38-15.2-3.547-6.723 3.675-8.311 12.642-8.693 19.6l3.548-2.029c-9.8-6.752-20.296-2.587-22.315 9.271-2.01 12.849 5.309 25.337 17.503 29.861 9.594 3.547 21.501 2.528 31.487 2.038 12.437-.617 25.902-1.842 37.515-6.684 3.763-1.568 8.232-3.92 9.663-8.036 1.597-4.615-1.647-8.82-4.802-11.867-1.568-1.441-3.881.862-2.372 2.371zM809.484 550.235c-3.322-7.017 5.821-13.975 12.181-10.702 5.684 2.94 7.389 10.202 5.88 15.945a2.255 2.255 0 003.734 2.176c2.528-2.46 5.145-5.096 8.516-6.341 3.724-1.362 9.496-.206 9.261 4.831a2.313 2.313 0 003.46 1.96c5.497-3.145 11.593-1.832 16.905 1.137 4.586 2.568 12.122 9.291 8.535 15.102-2.822 4.586-11.76 5.243-16.483 6.448-6.596 1.666-13.24 3.195-19.728 5.263a2.14 2.14 0 001.137 4.126c10.133-1.96 20.384-4.538 30.282-7.458 6.115-1.803 11.388-5.968 10.3-12.985-2.058-13.318-21.864-23.01-33.32-15.602l3.459 1.96c.167-5.341-4.145-9.29-9.29-9.947-6.566-.833-11.907 4.058-16.248 8.291l3.733 2.176c1.48-8.673-2.548-20.58-12.74-21.423-8.428-.735-16.346 8.604-12.23 16.503.892 1.715 3.371.206 2.568-1.509l.088.049zM290.829 791.775c12.818-23.706 33.918-41.326 56.909-54.733a319.672 319.672 0 0181.516-33.035 310.765 310.765 0 0190.434-9.575c28.852 1.235 56.84 8.693 83.379 20.021a368.37 368.37 0 0183.8 50.421c4.155 3.293 10.074-2.587 5.88-5.88-46.06-36.162-102.067-66.11-161.259-71.304-61.574-5.41-125.705 9.966-179.801 39.327-26.754 14.514-52.107 34.006-65.572 61.995-1.509 3.136 3.028 5.88 4.714 2.763z"
      ></path>
    </svg>
  );
}

export default LighthouseIllustration;
