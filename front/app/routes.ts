import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("contact", "routes/contact.tsx"),
  route("endpage", "routes/endpage.tsx"),

] satisfies RouteConfig;
