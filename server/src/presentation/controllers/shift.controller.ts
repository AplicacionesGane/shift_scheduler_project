import { validateShiftEntry } from '@presentation/schemas/shiftSchemaValidate'
import { ShiftUseCases } from '@application/shifts/shift.usecases'
import { Request, Response } from 'express'

export class ShiftController {
    constructor(private shiftUseCase: ShiftUseCases) { }

    public createShift = async (req: Request, res: Response) => {

        const { success, data, error } = validateShiftEntry(req.body)

        if (!success) {
            res.status(400).json({ message: 'Invalid shift data', error: error.format() })
            return
        }

        try {
            const createdShift = await this.shiftUseCase.execute(data)
            res.status(201).json(createdShift)
        } catch (error) {
            if(error instanceof Error ){
                res.status(400).json({ message: error.message })
                return 
            }
            res.status(500).json({ message: 'Error on server to create shift' })
        }
    }

    public getShiftById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: 'ID is required' })
            return
        }

        try {
            const shift = await this.shiftUseCase.findById(id)
            if (!shift) {
                res.status(404).json({ message: 'Shift not found' })
                return
            }
            res.status(200).json(shift)
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find shift' })
        }
    }

    public getAllShifts = async (req: Request, res: Response) => {
        try {
            const shifts = await this.shiftUseCase.findAll()
            if (!shifts || shifts.length === 0) {
                res.status(404).json({ message: 'No shifts found' })
                return
            }
            res.status(200).json(shifts)
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all shifts' })
        }
    }
}