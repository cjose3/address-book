module.exports = { initialize }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function initialize(app) {
  app.use(async(ctx, next) => {
    try {
      await next()
    } catch (err) {
      const { message } = err
      ctx.status = err.status || 500
      ctx.body = { message }
      ctx.app.emit('error', err, ctx)
    }
  })

  app.on('error', (err, ctx) => {
    ctx.logger.error(err)
  })
}
