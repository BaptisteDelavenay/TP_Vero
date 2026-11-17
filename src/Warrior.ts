import { Character } from "./Character";
import { Weapon } from "./Weapon";

export class Warrior extends Character{
    public readonly RAGE_MULTIPLIER:number = 1.5

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number){
        super(name, health, baseAttack, baseDefense)
        
    }

    public isEnraged(): boolean{
        return this.health >= this.maxHealth ? true : false
    }
    
    public getAttack(): number{
        if(this.isEnraged()){
            return Math.floor((this.baseAttack + this.getWeaponAttackBonus())*this.RAGE_MULTIPLIER)
        }
    }

    public canEquip(weapon: Weapon): boolean{
        if(weapon.kind == "staff"){
            false
        }
        else{
            return false
        }
    }

    public override describe(): string{
        return `[Warrior] ${this.name} - health ${this.health}/${this.maxHealth} - attack ${this.baseAttack} - defense ${this.baseDefense} - ${this.isEnraged ? "-enraged" : ''}`
    }

}