declare namespace Express {
  interface Request {
    user: {
      isAdmin?: boolean
      id: string
      role: "admin" | "casheer"
    }
  }
}

type TObjUnknown = Record<string, unknown>
