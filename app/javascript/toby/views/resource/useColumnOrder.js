import { useState, useCallback } from "react";

function getStoredOrder(resource) {
  const existing = localStorage.getItem(`${resource.type}_Order`) || "[]";
  return JSON.parse(existing);
}

function storeOrder(resource, attributes) {
  localStorage.setItem(
    `${resource.type}_Order`,
    JSON.stringify(attributes.map((a) => a.name)),
  );
}

function getOrderForResource(resource) {
  const stored = getStoredOrder(resource);
  const original = resource.attributes.map((a) => a.name);

  return [...resource.attributes].sort((a, b) => {
    const indexA = stored.indexOf(a.name) ?? original.indexOf(a.name);
    const indexB = stored.indexOf(b.name) ?? original.indexOf(b.name);
    return indexA - indexB;
  });
}

export default function useColumnOrder(resource) {
  const [orderedAttributes, setOrderedAttributes] = useState(() =>
    getOrderForResource(resource),
  );

  const updateAttributeOrder = useCallback(
    (newOrder) => {
      storeOrder(resource, newOrder);
      setOrderedAttributes(newOrder);
    },
    [resource],
  );

  return { orderedAttributes, updateAttributeOrder };
}
