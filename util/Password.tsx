function mapIncrease(map: Map<String, number>, char: string): void {
  if (map.has(char)) {
    map.set(char, (map.get(char) ?? 1) + 1)
  } else {
    map.set(char, 1)
  }
}

export function isPasswordStrong(password: string): boolean {
  if (password.length < 16) {
    return false
  }

  const upperLetterCount = new Map()
  const lowerLetterCount = new Map()
  const numberCount = new Map()
  const specialCharCount = new Map()
  const duplicateCount = new Map()

  for (const char of password) {
    if (/\d/.test(char)) {
      // É um dígito
      mapIncrease(numberCount, char)
      if (numberCount.get(char) > 3) {
        return false
      }
      if (numberCount.get(char) >= 2) {
        duplicateCount.set(char, true)
      }
    } else if (/[^\w\s]|_/.test(char)) {
      // É pontuação ou símbolo
      mapIncrease(specialCharCount, char)
      if (specialCharCount.get(char) > 3) {
        return false
      }
      if (specialCharCount.get(char) >= 2) {
        duplicateCount.set(char, true)
      }
    } else if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      // É letra maiúscula
      mapIncrease(upperLetterCount, char)
      if (upperLetterCount.get(char) > 3) {
        return false
      }
      if (upperLetterCount.get(char) >= 2) {
        duplicateCount.set(char, true)
      }
    } else {
      // É letra minúscula
      mapIncrease(lowerLetterCount, char)
      if (lowerLetterCount.get(char) > 3) {
        return false
      }
      if (lowerLetterCount.get(char) >= 2) {
        duplicateCount.set(char, true)
      }
    }
  }

  if (
    numberCount.size === 0 ||
    specialCharCount.size === 0 ||
    upperLetterCount.size < 2 ||
    lowerLetterCount.size < 3 ||
    duplicateCount.size > 3
  ) {
    return false
  }

  return true
}

// Exemplo de uso
// console.log(isPasswordStrong('Abc123!@#Def456$')) // Teste a função
// console.log(isPasswordStrong('Abc123!@#Def46$')) // Teste a função

//
// A função valida se uma senha é forte verificando:
//
// - Mínimo 16 caracteres
// - Pelo menos 1 dígito, 1 caractere especial
// - Pelo menos 2 letras maiúsculas diferentes e 3 minúsculas diferentes
// - Nenhum caractere repetido mais de 3 vezes
// - No máximo 3 caracteres duplicados (que aparecem 2+ vezes)
//
