import { Employee } from '../../domain/entities/Vendedor';
import { EmployeeRepository } from '../../domain/repositories/VendedorRepository';

/**
 * Caso de uso para obtener/sincronizar empleados desde el sistema externo
 * Los empleados no se crean aquí, sino que se obtienen del sistema de ventas
 */
export class GetEmployeeFromExternalSystem {
    private employeeRepository: EmployeeRepository;

    constructor(employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Obtener empleado por ID desde el sistema externo
     */
    async execute(employeeId: string): Promise<Employee | null> {
        // Primero intentar obtener desde cache/BD local
        let employee = await this.employeeRepository.findById(employeeId);
        
        // Si no existe o necesita actualización, sincronizar desde sistema externo
        if (!employee) {
            employee = await this.employeeRepository.refreshEmployeeData(employeeId);
        }
        
        return employee;
    }

    /**
     * Obtener todos los empleados activos
     */
    async getAllActiveEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.findActiveEmployees();
    }

    /**
     * Obtener empleados por tienda
     */
    async getEmployeesByStore(storeId: string): Promise<Employee[]> {
        return await this.employeeRepository.findByStoreId(storeId);
    }
}