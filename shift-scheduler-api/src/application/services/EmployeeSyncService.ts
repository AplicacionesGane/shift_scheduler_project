import { EmployeeRepository } from '../../domain/repositories/VendedorRepository';
import { Employee } from '../../domain/entities/Vendedor';

/**
 * Servicio para manejar la sincronización de empleados desde el sistema de ventas
 * Este servicio actúa como puente entre el sistema externo y nuestro dominio
 */
export class EmployeeSyncService {
    constructor(private employeeRepository: EmployeeRepository) {}

    /**
     * Sincronizar empleados activos para una tienda específica
     */
    async syncEmployeesByStore(storeId: string): Promise<Employee[]> {
        return await this.employeeRepository.findByStoreId(storeId);
    }

    /**
     * Verificar si un empleado está activo antes de asignar turnos
     */
    async validateEmployeeForScheduling(employeeId: string): Promise<boolean> {
        const isActive = await this.employeeRepository.isEmployeeActive(employeeId);
        return isActive;
    }

    /**
     * Obtener empleados disponibles para programación de turnos
     */
    async getAvailableEmployeesForScheduling(storeId: string): Promise<Employee[]> {
        const employees = await this.employeeRepository.findByStoreId(storeId);
        
        // Filtrar solo empleados activos
        const activeEmployees = [];
        for (const employee of employees) {
            const isActive = await this.employeeRepository.isEmployeeActive(employee.id);
            if (isActive) {
                activeEmployees.push(employee);
            }
        }
        
        return activeEmployees;
    }

    /**
     * Actualizar datos de un empleado específico desde el sistema fuente
     */
    async refreshEmployeeData(employeeId: string): Promise<Employee | null> {
        return await this.employeeRepository.refreshEmployeeData(employeeId);
    }
}
