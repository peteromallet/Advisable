import { useState, useEffect } from "react";
import { object, string } from "yup";

const validateImage = object().shape({
  property: string().matches(/image/),
  content: string().url(),
});
const validateTitle = object().shape({
  property: string().matches(/title/),
});

const parseXMLElement = (element) => ({
  name: element.getAttribute("name"),
  property: element.getAttribute("property"),
  content: element.getAttribute("content"),
});

function useOpenGraph(url) {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const getUrl = async (url) => {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then((res) => res.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
          const htmlCollection = data.getElementsByTagName("meta");
          const elements = Array.prototype.slice.call(htmlCollection);
          const { image, title } = elements.reduce((acc, element) => {
            const parsedElement = parseXMLElement(element);
            const isImage = validateImage.isValidSync(parsedElement);
            const isTitle = validateTitle.isValidSync(parsedElement);
            const image = isImage ? parsedElement.content : acc?.image;
            const title = isTitle ? parsedElement.content : acc?.title;
            return { image, title };
          });
          return { image, title };
        });
      setImage(response.image);
      setTitle(response.title);
    };
    getUrl(url);
  }, [url]);

  return { image, title };
}

export default useOpenGraph;
