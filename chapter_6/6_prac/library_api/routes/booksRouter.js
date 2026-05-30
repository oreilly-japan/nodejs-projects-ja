import Book from "../models/book.js";

async function booksRouter(fastify, _opts) {
  // GET /api/books - return all books
  fastify.get("/", async (_request, reply) => {
    try {
      const books = await Book.findAll();
      reply.send(books);
    } catch (e) {
      console.error("Error occurred: ", e.message);
      reply.send(e);
    }
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const book = await Book.findByPk(id);
      reply.send(book);
    } catch (e) {
      console.error("Error occurred: ", e.message);
      reply.send(e);
    }
  });

  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params;
    const { title, author } = request.body;
    try {
      const book = await Book.update(
        { title, author },
        {
          where: { id },
        }
      );
      reply.send(book);
    } catch (e) {
      console.error("Error occurred: ", e.message);
      reply.send(e);
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const book = await Book.destroy({
        where: { id },
      });
      reply.send(book);
    } catch (e) {
      console.error("Error occurred: ", e.message);
      reply.send(e);
    }
  });

  // POST /api/books - count requests for existing books, or create new
  fastify.post("/", async (request, reply) => {
    const { title, author } = request.body;

    try {
      const existingBook = await Book.findOne({ where: { title } });

      if (existingBook) {
        existingBook.count += 1;
        await existingBook.save();
        reply.send(existingBook);
      } else {
        const book = await Book.create({ title, author, count: 1 });
        reply.send(book);
      }
    } catch (e) {
      console.error("Error occurred:", e.message);
      reply.send(e);
    }
  });
}

export default booksRouter;
