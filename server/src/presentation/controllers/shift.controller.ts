import { validateShiftEntry } from '@presentation/schemas/shiftSchemaValidate'
import { ShiftUseCases } from '@application/shifts/shift.usecases'
import { Request, Response } from 'express'

export class ShiftController {
  constructor(private shiftUseCase: ShiftUseCases) { }

  public registerCtrl = async (req: Request, res: Response) => {
    try {
      const { success, data, error } = validateShiftEntry(req.body);

      if (!success) {
        res.status(400).json({ message: 'Error to create new Shift', error: error.format() });
        return
      }

      const newShift = await this.shiftUseCase.createShift(data)

      res.status(201).json({ message: 'New shift created sucessfully', data: newShift })

    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: 'Error to create new Shift', error: error.message })
        return
      }

      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public updateCtrl = async (req: Request, res: Response) => {
    try {
      const { success, data, error } = validateShiftEntry(req.body);

      if (!success) {
        res.status(400).json({ message: 'Error to update Shift', error: error.format() });
        return;
      }

      const updatedShift = await this.shiftUseCase.updateShift(data);
      res.status(200).json({ message: 'Shift updated successfully', data: updatedShift });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: 'Error to update Shift', error: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public getOneCtrl = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!id){
      res.status(400).json({ message: 'Shift ID is required' });
      return
    }

    try {
      const shiftById = await this.shiftUseCase.getShiftById(id);
      if (!shiftById) {
        res.status(404).json({ message: 'Shift not found' });
        return;
      }
      res.status(200).json(shiftById);
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).json({ message: 'Error to get Shift by ID', error: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public getAllCtrl = async (req: Request, res: Response) => {
    try {
      const allShifts = await this.shiftUseCase.getAllShifts();
      res.status(200).json(allShifts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: 'Error to get all Shifts', error: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public deleteCtrl = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!id){
      res.status(400).json({ message: 'Shift ID is required' });
      return
    }

    try {
      await this.shiftUseCase.deleteShift(id);
      res.status(200).json({ message: 'Shift deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: 'Error to delete Shift', error: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}