export function getAuthorImgSrc(authorImageName: string, size?: number, format?: string): string {
  return getImageUrl('authors', authorImageName, size, format);
}

export function getTestimonialImgSrc(imageName: string, size?: number, format?: string): string {
  return getImageUrl('people', imageName, size, format);
}

function getImageUrl(dir: string, imageName: string, size?: number, format?: string): string {
  let ext = '.png';
  let fileName = imageName + ext;

  if (format) {
    fileName = `${imageName}.${format}`;
  }
  if (size) {
    return `/img/${dir}/${size}/${fileName}`;
  }
  return `/img/${dir}/${fileName}`;
}

export function isUrlExternal(url: string): boolean {
  const internal = /^\/(?!\/)/.test(url);
  return !internal;
}

/*
export function isUrlExternal(url: string) {
  const windowGlobal = typeof window !== 'undefined' && window;
  const locationGlobal =
    typeof windowGlobal.location !== 'undefined' && windowGlobal.location;
  const documentGlobal = typeof document !== 'undefined' && document;
  const createElementGlobal =
    typeof documentGlobal.createElement !== 'undefined' &&
    documentGlobal.createElement;

  const host = locationGlobal.hostname;

  const linkHost = (function(url) {
    if (/^https?:\/\//.test(url)) {
      // Absolute URL.
      // The easy way to parse an URL, is to create <a> element.
      // @see: https://gist.github.com/jlong/2428561
      const parser = createElementGlobal('a');
      parser.href = url;

      return parser.hostname;
    } else {
      // Relative URL.
      return locationGlobal.hostname;
    }
  })(url);

  return host !== linkHost;
}
*/
