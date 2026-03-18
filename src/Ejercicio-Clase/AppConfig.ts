
/**
 * @class Clase 
 */
export class AppConfig {

  private config: Record<string, string>;
  private _lang: string;
	private _theme: string;
	private _apiUrl: string;

  private static instance: AppConfig;

	/**
	 * Constructor de la clase AppConfig, inicializa todo sin valor alguno
	 */
  private constructor() {
		this._lang = ""
		this._theme = ""
		this._apiUrl = ""
    this.config = {};
  }

	/**
	 * Getter de _lang
	 * @returns _lang de la instancia
	 */
	public getLang(): string{
		return this._lang;
	}

	/**
	 * Getter de theme
	 * @returns  _theme de la instancia
	 */
	public getTheme(): string{
		return this._theme;
	}

	/**
	 * Getter de apiUrl
	 * @returns 
	 */
	public getApiUrl(): string{
		return this._apiUrl
	}

	/**
	 * Metodo encargado de devolver la instancia actual
	 * @returns Devuelve la instancia actual
	 */
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }


	/**
	 * Metodo que mediante una clave inserta una valor en el config
	 * @param key clave para insertar
	 * @param value valor que vamos a insertar con la clave
	 */
  public set(key: string, value: string): void {
    this.config[key] = value;
  }

	/**
	 * Metodo que devuelve el valor dado una clave en el config
	 * @param key clave del valor
	 * @returns devuelve el valor de la clave porporcionada
	 */
  public get(key: string): string | undefined {
    return this.config[key];
  }

	/**
	 * Metodo que devuelve una copia entera del config
	 * @returns copia del config 
	 */
  public getAll(): Record<string, string> {

		let copia: Record<string , string> = { ...this.config };
		return copia;
  }

	/**
	 * Metodo que borra el contenido de config
	 */
	public reset(): void{
		if (this.get("env") !== "test") {
			throw new Error("reset() solo esta permitido en entorno de pruebas");
		}
		this.config = {};
	}

	/**
	 * Metodo encargado de cargar un perfil dependiendo del profile seleccionado
	 * @param profile seleccion del perfil a cargar
	 */
	public loadProfile(profile: "development" | "production"): void{
		switch (profile) {
			case "development":
				this._lang = "es"
				this._theme = "dark";
				this._apiUrl = "https://localhost3000"
				break;
			case "production":
				this._lang = "en"
				this._theme = "ligth"
				this._apiUrl = "https://api.miapp.com"
			default:
				break;
		}
	}
}