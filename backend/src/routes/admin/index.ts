import { Router } from 'express'
import authRouter from './auth'
import statsRouter from './stats'
import contactsRouter from './contacts'
import blogRouter from './blog'
import vacanciesRouter from './vacancies'

const router = Router()

router.use('/', authRouter)
router.use('/stats', statsRouter)
router.use('/contacts', contactsRouter)
router.use('/blog', blogRouter)
router.use('/vacancies', vacanciesRouter)

export default router
