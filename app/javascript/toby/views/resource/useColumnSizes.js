import { throttle } from "lodash-es";
import { useCallback, useEffect, useRef, useState } from "react";

function getStoredSizes(resource) {
  const existing = localStorage.getItem(`${resource.type}_Sizes`) || "{}";
  return JSON.parse(existing);
}

function storeSizes(resource, sizes) {
  localStorage.setItem(`${resource.type}_Sizes`, JSON.stringify(sizes));
}

function getSizesForResource(resource) {
  return resource.attributes.reduce((sizes, attribute) => {
    const existing = getStoredSizes(resource);
    sizes[attribute.name] = existing[attribute.name] || 200;
    return sizes;
  }, {});
}

export default function useColumnSizes(resource) {
  const resizingRef = useRef(null);
  const [resizingAttr, setResizingAttr] = useState(null);
  const [sizes, setSizes] = useState(() => {
    return getSizesForResource(resource);
  });

  const resizeColumn = useCallback((name, size) => {
    setSizes((existing) => {
      return { ...existing, [name]: size };
    });
  }, []);

  const sizeForColumn = useCallback((name) => sizes[name], [sizes]);

  const resizePropsForHeaderCell = useCallback(
    (attr) => {
      return {
        "data-resizing": resizingAttr === attr,
        onMouseDown: (e) => {
          setResizingAttr(attr);
          const initial = getStoredSizes(resource)[attr];
          resizingRef.current = { initial: initial, x: e.clientX };
        },
      };
    },
    [resizingAttr, resource],
  );

  const mouseMove = useCallback(
    (e) => {
      if (!resizingRef.current) return;
      const initial = resizingRef.current.initial;
      const delta = e.clientX - resizingRef.current.x;
      const newSize = initial + delta;
      resizeColumn(resizingAttr, Math.max(120, newSize));
    },
    [resizingAttr, resizeColumn],
  );

  const mouseUp = useCallback(() => {
    setResizingAttr(null);
    resizingRef.current = null;
  }, []);

  useEffect(() => {
    storeSizes(resource, sizes);
  }, [resource, sizes]);

  useEffect(() => {
    const mouseMoveThrottled = throttle(mouseMove, 50);
    window.addEventListener("mousemove", mouseMoveThrottled);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMoveThrottled);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [mouseMove, mouseUp]);

  return { sizeForColumn, resizePropsForHeaderCell, isResizing: resizingAttr };
}
