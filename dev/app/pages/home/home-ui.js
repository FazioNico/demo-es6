
export function homeSkeleton(data){
  return `
  <section>
    <h1>${data.title}</h1>
    <form>
      <input name="email" type="email">
      <input name="password" type="password">
      <button>login</button>
    </form>
    <p id="switchForm">Click here to create new account</p>
  </section>
  `
}
