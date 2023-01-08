import { Testimonial } from "../models";


export function testimonialFromTestimonialJsonEdge(
  edge: Queries.TestimonialsJsonEdge
): Testimonial {
  const n = edge.node;
  return {
    testimonialId: n.testimonialId,
    name: n.name,
    img: n.img,
    twitter: n.twitter,
    order: n.order,
    quoteHtml: n.quoteHtml,
    titleHtml: n.titleHtml
  };
}
