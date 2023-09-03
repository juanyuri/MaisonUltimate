import { ref } from 'vue'

/**
 * Returns a reactive reference to an array of all natures.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all natures.
 */
export const useNatures = () => {
  const natures = []
  /* ++Attack */
  natures.push({name:'Lonely',placeholder:'Lonely(+At, -Df)'}) // Huraña
  natures.push({name:'Adamant',placeholder:'Adamant(+At, -Sa)'}) // Firme
  natures.push({name:'Brave',placeholder:'Brave(+At, -Sp)'}) // Audaz
  natures.push({name:'Naughty',placeholder:'Naughty(+At, -Sd)'}) // Pícara

  /* ++Defense */
  natures.push({name:'Bold',placeholder:'Bold(+Df, -At)'}) // Osada
  natures.push({name:'Relaxed',placeholder:'Relaxed(+Df, -Sp)'}) // Placida
  natures.push({name:'Impish',placeholder:'Impish(+Df, -Sa)'}) // Agitada
  natures.push({name:'Lax',placeholder:'Lax(+Df, -Sd)'}) // Floja

  /* ++Sp. Attack */
  natures.push({name:'Modest',placeholder:'Modest(+Sa, -At)'}) // Modesta
  natures.push({name:'Mild',placeholder:'Mild(+Sa, -Df)'}) // Afable
  natures.push({name:'Quiet',placeholder:'Quiet(+Sa, -Sp)'}) // Mansa
  natures.push({name:'Rash',placeholder:'Rash(+Sa, -Sd)'}) // Alocada

  /* ++Sp. Defense */
  natures.push({name:'Calm',placeholder:'Calm(+Sd, -At)'}) // Serena
  natures.push({name:'Gentle',placeholder:'Gentle(+Sd, -Df)'}) // Amable
  natures.push({name:'Sassy',placeholder:'Sassy(+Sd, -Sp)'}) // Grosera
  natures.push({name:'Careful',placeholder:'Careful(+Sd, -Sa)'}) // Cauta
  
  /* ++Velocidad */
  natures.push({name:'Timid',placeholder:'Timid(+Sp, -At)'}) // Miedosa
  natures.push({name:'Hasty',placeholder:'Hasty(+Sp, -Df)'}) // Activa
  natures.push({name:'Jolly',placeholder:'Jolly(+Sp, -Sa)'}) // Alegre
  natures.push({name:'Naive',placeholder:'Naive(+Sp, -Sd)'}) // Ingenua
  
  /* NO effect */
  natures.push({name:'Hardy',placeholder:'Hardy'}) // Fuerte
  natures.push({name:'Docile',placeholder:'Docile'}) // Dócil
  natures.push({name:'Serious',placeholder:'Serious'}) // Seria
  natures.push({name:'Bashful',placeholder:'Bashful'}) // Tímida
  natures.push({name:'Quirky',placeholder:'Quirky'}) // Rara

  return ref(natures)
}