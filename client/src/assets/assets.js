import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.jpg";
import sample_img_2 from "./sample_img_2.jpg";
import sample_img_3 from "./sample_img_3.jpg";
import sample_img_4 from "./sample_img_4.jpg";
import sample_img_5 from "./sample_img_5.jpg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import Baby_hulk from "./Baby_hulk.jpg"
import picture from "./picture.png"

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  sample_img_3,
  sample_img_4,
  sample_img_5,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  Baby_hulk,
  picture,
};

export const stepsData = [
  {
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    stars: 5,
    text: `Imagify has completely changed how I create visuals. I can turn my ideas into stunning images just by typing a prompt, which saves hours of manual design work.`,
  },
  {
    image: profile_img_2,
    name: "Richard Nelson",
    role: "Content Creator",
    stars: 5,
    text: `As a content creator, Imagify helps me generate unique images for my posts instantly. It’s fast, creative, and perfect for bringing my ideas to life.`,
  },
  {
    image: profile_img_3,
    name: "Jeet Selal",
    role: "Digital Artist",
    stars: 5,
    text: `Imagify is a powerful tool for experimenting with concepts. I can visualize ideas in seconds and use them as inspiration for my digital artwork.`,
  },
];

export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
