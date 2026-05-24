import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AdminRequest extends Request {
  adminId?: string
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const token = auth.slice(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { adminId: string }
    req.adminId = payload.adminId
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
