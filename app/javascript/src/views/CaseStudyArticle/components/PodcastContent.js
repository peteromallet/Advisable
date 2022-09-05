import React, { useLayoutEffect, useRef } from "react";

export default function PodcastContent({ id, url }) {
  const container = useRef();

  useLayoutEffect(() => {
    if (!container.current) return;
    const scriptSrc = `${url}.js?container_id=${id}&player=small`;
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", "utf-8");
    script.setAttribute("src", scriptSrc);
    container.current.after(script);
  }, [id, url]);

  return <div id={id} ref={container} className="mb-10" />;
}
