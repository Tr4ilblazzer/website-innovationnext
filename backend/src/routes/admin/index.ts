import { Router } from 'express'
import authRouter from './auth'
import statsRouter from './stats'
import contactsRouter from './contacts'
import blogRouter from './blog'
import vacanciesRouter from './vacancies'
import usersRouter from './users'

const router = Router()

router.use('/', authRouter)
router.use('/stats', statsRouter)
router.use('/contacts', contactsRouter)
router.use('/blog', blogRouter)
router.use('/vacancies', vacanciesRouter)
router.use('/users', usersRouter)

export default router
