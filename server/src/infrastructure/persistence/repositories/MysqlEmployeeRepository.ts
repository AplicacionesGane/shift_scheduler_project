import { EmployeeModel } from '@infrastructure/persistence/models/employee.model';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { EmployeeEntity } from '@domain/entities/employe.entity';

export class MysqlEmployeeRepository implements EmployeeRepository {

    findById = async (document: string): Promise<EmployeeEntity | null> => {
        try {
            const employe = await EmployeeModel.findOne({ where: { DOCUMENTO: document } })

            if (!employe || !employe.dataValues) return null

            const mapEmployee: EmployeeEntity = {
                nombres: employe.dataValues.DOCUMENTO,
                documento: employe.dataValues.DOCUMENTO,
                cargo: employe.dataValues.CARGO,
                ccosto: employe.dataValues.CCOSTO,
                grpvtasCode: employe.dataValues.GRPVTAS_CODIGO,
                nameCargo: employe.dataValues.NOMBRECARGO
            }

            return mapEmployee

        } catch (error) {
            if (error) {
                console.log(error);
                return null
            }

            return null
        }
    }

    findAll = async (): Promise<EmployeeEntity[] | null> => {
        try {
            await EmployeeModel.sync()
            const employess = await EmployeeModel.findAll()

            if (!employess) return null

            const mapEmployees: EmployeeEntity[] = employess.map((emp) => {
                return {
                    nombres: emp.dataValues.DOCUMENTO,
                    documento: emp.dataValues.DOCUMENTO,
                    cargo: emp.dataValues.CARGO,
                    ccosto: emp.dataValues.CCOSTO,
                    grpvtasCode: emp.dataValues.GRPVTAS_CODIGO,
                    nameCargo: emp.dataValues.NOMBRECARGO
                }
            })

            return mapEmployees

        } catch (error) {
            if (error) {
                console.log(error);
                return null
            }

            return null
        }
    }

    findByCargo = async (cargo: string): Promise<EmployeeEntity[] | null> => {
        try {
            const employes = await EmployeeModel.findAll({ where: { CARGO: cargo } })

            if (!employes) return null

            const mapEmployees: EmployeeEntity[] = employes.map((emp) => {
                return {
                    nombres: emp.dataValues.DOCUMENTO,
                    documento: emp.dataValues.DOCUMENTO,
                    cargo: emp.dataValues.CARGO,
                    ccosto: emp.dataValues.CCOSTO,
                    grpvtasCode: emp.dataValues.GRPVTAS_CODIGO,
                    nameCargo: emp.dataValues.NOMBRECARGO
                }
            })

            return mapEmployees

        } catch (error) {
            if (error) {
                console.log(error);
                return null
            }

            return null
        }
    }

}