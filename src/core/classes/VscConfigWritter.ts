import { IBindedEntity } from '../../types/IBindedEntity.js'
import { type PatternGroups } from '../../types/Config.js'
import { IJSONObject } from '../../types/IJsonObject.js'

import { AIconConfigWritter } from './AIconConfigWritter.js'
const getVscConfigPath = ( workplace: string ): string => workplace + '/.vscode/settings.json'

interface IAssociatedIconConfig {
  [key: string]: string;
}

export class VscConfigWritter extends AIconConfigWritter {
  private config: IJSONObject

  constructor( workplaceRoot: string ) {
    super( workplaceRoot )
  }

  async writeIconThemeConfig( patternGroups: Record<PatternGroups, IBindedEntity[]> ): Promise<void> {
    const vscodeConfigWorkplacePath = getVscConfigPath( this.workplaceRoot )
    this.config = await super.getConfig( vscodeConfigWorkplacePath )

    let group: PatternGroups
    for ( group in  patternGroups ) {
      const configPartial: IAssociatedIconConfig = this.createConfigOfAssociatedIcons( patternGroups[ group ] )
      this.setAssociations( group, configPartial )
    }

    await super.writeConfig( vscodeConfigWorkplacePath, this.config )
  }

  private createConfigOfAssociatedIcons( issociatedIcons: IBindedEntity[] ): IAssociatedIconConfig {
    const config: IAssociatedIconConfig  = {}

    for ( const entity of issociatedIcons ) {
      config[ entity.name ] = entity.icon
    }

    return config
  }

  private setAssociations( patternGroup: PatternGroups, configPartials: IAssociatedIconConfig ) {
    const iconThemeAssociationProp = `material-icon-theme.${ patternGroup }.associations`

    if ( this.config[ iconThemeAssociationProp ] ) {
      for ( const [ entity, icon ] of Object.entries( configPartials ) )  {
        const associatedPropConfig = this.config[ iconThemeAssociationProp ] as IJSONObject
        associatedPropConfig[ entity ] = icon
      }
    } else {
      this.config[ iconThemeAssociationProp ] = configPartials
    }
  }

}
