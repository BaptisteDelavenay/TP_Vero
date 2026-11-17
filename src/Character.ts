import { Weapon } from "./Weapon";

export abstract class Character{

    public readonly name:string;
    public readonly maxHealth:number;
    public readonly baseAttack:number;
    public readonly baseDefense:number;
    private _health:number;
    private _weapon:Weapon | null;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number){

        if(health <= 0){
            throw new Error(`The health of ${name} must be strictly positive`) 
        }

        this.name = name;
        this._health = health;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense
        this.maxHealth = health;
        this._weapon = null;
    }


    public get health():number{
        return this._health;
    }

    public abstract getAttack():number

    public abstract canEquip(weapon: Weapon): boolean

    protected getWeaponAttackBonus(): number{
        return this._weapon ? this._weapon.attackBonus : 0;
    }

    public isAlive():boolean{
        return this._health > 0
    }

    public describe():string{
        return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.getAttack()} - defense ${this.baseDefense} - weapon: ${this._weapon ? this._weapon.name : "none"}`
    }

    public equip(weapon: Weapon): void{
        if(this.canEquip(weapon)){
            this._weapon = weapon
        }
        else{
            throw new Error(`${this.name} cannot equip ${weapon.name}`)
        }
    }

    public takeDamage(amount: number): void{
        if(this._health - amount >= 0){
            this._health -= amount
        }
        else{
            this._health = 0
        }
    }


    public heal(amount: number): void{
        if(this._health + amount <= this.maxHealth){
            this._health += amount
        }
        else{
            this._health = this.maxHealth
        }
    }

    protected computeDamage(target: Character){
        return this.getAttack() - target.baseDefense > 0 ? this.getAttack() - target.baseDefense : 0
    }

    public attack(target: Character): number {
        if(!this.isAlive()){
            throw new Error(`${this.name} is KO and cannot attack`)
        }
        if(this === target){
            throw new Error(`${this.name} cannot attack themselves`)
        }
        if(!target.isAlive()){
            throw new Error(`${target.name} is already KO.`)
        }
        target._health -= this.computeDamage(target)
        console.log(`${this.name} hits ${target.name} for ${this.computeDamage(target)} damage (${target.name}: ${target._health}/${target.maxHealth}).`)
        if(!target.isAlive()){
            console.log(`${target.name} is KO!`)
        }
        return this.computeDamage(target)
    }
    

}