import { Request, Response, NextFunction } from 'express';

export class SimpleLogger {
    
    static requestLogger() {
        return (req: Request, res: Response, next: NextFunction) => {
            const startTime = Date.now();
            const timestamp = new Date().toISOString();
            const ip = req.ip || req.connection.remoteAddress || 'unknown';
            
            console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Started - IP: ${ip}`);
            
            // Interceptar cuando termine la respuesta
            const originalSend = res.send;
            res.send = function(body: any) {
                const endTime = Date.now();
                const duration = endTime - startTime;
                const endTimestamp = new Date().toISOString();
                
                const emoji = SimpleLogger.getStatusEmoji(res.statusCode);
                const color = SimpleLogger.getStatusColor(res.statusCode);
                const resetColor = '\x1b[0m';
                
                console.log(`${emoji} [${endTimestamp}] ${req.method} ${req.originalUrl} - ${color}${res.statusCode}${resetColor} - ${duration}ms - IP: ${ip}`);
                
                return originalSend.call(this, body);
            };
            
            next();
        };
    }

    private static getStatusEmoji(statusCode: number): string {
        if (statusCode >= 200 && statusCode < 300) return '✅';
        if (statusCode >= 400 && statusCode < 500) return '🔴';
        if (statusCode >= 500) return '💥';
        return '📡';
    }

    private static getStatusColor(statusCode: number): string {
        if (statusCode >= 200 && statusCode < 300) return '\x1b[32m'; // Verde
        if (statusCode >= 400 && statusCode < 500) return '\x1b[31m'; // Rojo
        if (statusCode >= 500) return '\x1b[35m'; // Magenta
        return '\x1b[0m'; // Sin color
    }
}
