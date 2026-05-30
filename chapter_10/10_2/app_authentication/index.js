import Fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";

const app = Fastify();
const PORT = 3000;
const PUBLIC_HOST = process.env.APP_HOST || "localhost";
const PUBLIC_PORT = process.env.APP_PORT || PORT;

const loginFormVars = {
  signup: {
    title: "Sign up",
    message: "Already have an account?",
    route: "/account",
    switchPage: "login",
    showExtraFields: true,
  },
  login: {
    title: "Log in",
    message: "Need to create an account?",
    route: "/auth",
    switchPage: "signup",
    showExtraFields: false,
  },
};

app.register(fastifyFormbody);
app.register(fastifyView, {
  engine: { handlebars },
  root: "views",
});

app.get("/", async (request, reply) => {
  const { page } = request.query;
  const formVars = loginFormVars[page] || loginFormVars.signup;
  return reply.view("index", formVars);
});

try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`App listening on http://${PUBLIC_HOST}:${PUBLIC_PORT}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
