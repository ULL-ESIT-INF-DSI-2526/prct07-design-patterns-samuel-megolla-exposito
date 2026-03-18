import { describe, test, expect} from 'vitest';
import { AppConfig } from '../../src/Ejercicio-Clase/AppConfig';

describe('AppConfig Tests', () => {
  
  test('Debe garantizar que dos instancias obtenidas son exactamente la misma', () => {
    const instance1 = AppConfig.getInstance();
    instance1.loadProfile("development");

    const instance2 = AppConfig.getInstance();
    instance2.loadProfile("production");
    expect(instance1).toBe(instance2);
  });

  test('Debe permitir escribir un valor y leerlo desde una referencia distinta', () => {
    const configModuleA = AppConfig.getInstance();
    const configModuleB = AppConfig.getInstance();

    configModuleA.set('version', '1.0.0');
    expect(configModuleB.get('version')).toBe('1.0.0');
  });

  test('Debe cargar correctamente el perfil de development', () => {
    const config = AppConfig.getInstance();
    config.loadProfile('development');
    
    expect(config.getLang()).toBe('es');
    expect(config.getTheme()).toBe('dark');
    expect(config.getApiUrl()).toBe('https://localhost3000')
  });


  test('Debe cargar correctamente el perfil de production', () => {
    const config = AppConfig.getInstance();
    config.loadProfile('production');
    
    expect(config.getLang()).toBe('en');
    expect(config.getTheme()).toBe('ligth');
    expect(config.getApiUrl()).toBe('https://api.miapp.com')
  });


  test('Debe devolver una copia en getAll y no la referencia original', () => {
    const config = AppConfig.getInstance();
    config.set('testKey', 'value');
    
    const allConfig = config.getAll();
    allConfig['hola'] = 'modified';
    
    expect(config.get('hola')).toBe(undefined);
  });

  test('Debe lanzar error al hacer reset si no es entorno test', () => {
    const config = AppConfig.getInstance();
    config.set('env', 'production');
    
    expect(() => config.reset()).toThrow("reset() solo esta permitido en entorno de pruebas");
  });

  test('Debe limpiar la configuracion si env es test', () => {
    const config = AppConfig.getInstance();
    config.set('env', 'test');
    config.set('token', '123');

    config.reset();
    expect(config.get('token')).toBeUndefined();
  });
});
