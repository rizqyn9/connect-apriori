declare namespace Express {
  interface Request {
    user: {
      isAdmin?: boolean
    }
  }
}

type TObjUnknown = Record<string, unknown>
