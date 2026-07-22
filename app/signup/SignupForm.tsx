'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'
import { useFormik } from 'formik'
import { Input, Select, Button, Spinner } from '@fluentui/react-components'

import { isPasswordStrong } from '@/util/Password'
import {
  registerUser,
  RegisterUserStatusT,
  UserListDataT,
  confirmRegistration,
} from '@/business/user'

Yup.setLocale(ptForm)

const personValidationSchema = Yup.object({
  name: Yup.string().min(3, 'Mínimo de três caracteres').required(),
  email: Yup.string().email('Formato de e-mail inválido').required(),
  password: Yup.string()
    .required()
    .test('strongness', 'A senha precisa ser forte', (value) =>
      isPasswordStrong(value)
    ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Senhas devem coincidir')
    .required(),
  firstName: Yup.string().min(3, 'Mínimo de três caracteres').required(),
  lastName: Yup.string().min(3, 'Mínimo de três caracteres').required(),
  completeName: Yup.string().required(),
  phoneNumber: Yup.string()
    .matches(
      /\+\d{1,3} \d{5,12}/,
      'O formato do telefone é +0[00] 00000[00000]. Coloque o código do país e então, o número com DDD.'
    )
    .required(),
  legalIdentification: Yup.string().required(),
})

export default function Home() {
  const router = useRouter()

  const [wait, setWait] = useState(false)
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [submittedUserName, setSubmittedUserName] = useState('')
  const [submitCode, setSubmitCode] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const personFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      firstName: '',
      lastName: '',
      completeName: '',
      phoneNumber: '',
      legalIdentification: '',
      countryIso2: 'br',
      title: '',
      documentType: 'pass',
    },
    onSubmit: async (values) => {
      setWait(true)
      try {
        let status = await registerUser(values)
        console.log('Register status response: ', status)
        if (status.success) {
          setSubmittedUserName(values.name)
          setSubmittedEmail(values.email)

          // Limpa formulário
          personFormik.resetForm()
          setSubmissionSuccess(true)

          // TODO: Show message with success
        } else {
          // TODO: Show message with error
        }
      } catch (e) {
        // TODO: Show message with error
      }
      setWait(false)
    },
    validationSchema: personValidationSchema,
  })

  const countries = (
    <>
      <option value="">-- Escolha um país --</option>
      <option value="af">Afeganistão</option>
      <option value="za">África do Sul</option>
      <option value="al">Albânia</option>
      <option value="de">Alemanha</option>
      <option value="ad">Andorra</option>
      <option value="ao">Angola</option>
      <option value="ai">Anguilla</option>
      <option value="aq">Antártida</option>
      <option value="ag">Antígua e Barbuda</option>
      <option value="sa">Arábia Saudita</option>
      <option value="dz">Argélia</option>
      <option value="ar">Argentina</option>
      <option value="am">Armênia</option>
      <option value="aw">Aruba</option>
      <option value="au">Austrália</option>
      <option value="at">Áustria</option>
      <option value="az">Azerbaijão</option>
      <option value="bs">Bahamas</option>
      <option value="bh">Bahrein</option>
      <option value="bd">Bangladesh</option>
      <option value="bb">Barbados</option>
      <option value="be">Bélgica</option>
      <option value="bz">Belize</option>
      <option value="bj">Benin</option>
      <option value="bm">Bermudas</option>
      <option value="by">Bielorrússia</option>
      <option value="bo">Bolívia</option>
      <option value="ba">Bósnia e Herzegovina</option>
      <option value="bw">Botsuana</option>
      <option value="br" className="font-extrabold">
        Brasil
      </option>
      <option value="bn">Brunei</option>
      <option value="bg">Bulgária</option>
      <option value="bf">Burkina Faso</option>
      <option value="bi">Burundi</option>
      <option value="bt">Butão</option>
      <option value="cv">Cabo Verde</option>
      <option value="cm">Camarões</option>
      <option value="kh">Camboja</option>
      <option value="ca">Canadá</option>
      <option value="qa">Catar</option>
      <option value="kz">Cazaquistão</option>
      <option value="td">Chade</option>
      <option value="cl">Chile</option>
      <option value="cn">China</option>
      <option value="cy">Chipre</option>
      <option value="co">Colômbia</option>
      <option value="km">Comores</option>
      <option value="cg">Congo</option>
      <option value="kp">Coreia do Norte</option>
      <option value="kr">Coreia do Sul</option>
      <option value="ci">Costa do Marfim</option>
      <option value="cr">Costa Rica</option>
      <option value="hr">Croácia</option>
      <option value="cu">Cuba</option>
      <option value="cw">Curaçao</option>
      <option value="dk">Dinamarca</option>
      <option value="dj">Djibuti</option>
      <option value="dm">Dominica</option>
      <option value="eg">Egito</option>
      <option value="sv">El Salvador</option>
      <option value="ae">Emirados Árabes Unidos</option>
      <option value="ec">Equador</option>
      <option value="er">Eritreia</option>
      <option value="sk">Eslováquia</option>
      <option value="si">Eslovênia</option>
      <option value="es">Espanha</option>
      <option value="us">Estados Unidos</option>
      <option value="ee">Estônia</option>
      <option value="sz">Eswatini</option>
      <option value="et">Etiópia</option>
      <option value="fj">Fiji</option>
      <option value="ph">Filipinas</option>
      <option value="fi">Finlândia</option>
      <option value="fr">França</option>
      <option value="ga">Gabão</option>
      <option value="gm">Gâmbia</option>
      <option value="gh">Gana</option>
      <option value="ge">Geórgia</option>
      <option value="gi">Gibraltar</option>
      <option value="gd">Granada</option>
      <option value="gr">Grécia</option>
      <option value="gl">Groenlândia</option>
      <option value="gp">Guadalupe</option>
      <option value="gu">Guam</option>
      <option value="gt">Guatemala</option>
      <option value="gg">Guernsey</option>
      <option value="gy">Guiana</option>
      <option value="gf">Guiana Francesa</option>
      <option value="gn">Guiné</option>
      <option value="gq">Guiné Equatorial</option>
      <option value="gw">Guiné-Bissau</option>
      <option value="ht">Haiti</option>
      <option value="nl">Holanda</option>
      <option value="hn">Honduras</option>
      <option value="hk">Hong Kong</option>
      <option value="hu">Hungria</option>
      <option value="ye">Iêmen</option>
      <option value="bv">Ilha Bouvet</option>
      <option value="cx">Ilha Christmas</option>
      <option value="im">Ilha de Man</option>
      <option value="nf">Ilha Norfolk</option>
      <option value="ax">Ilhas Åland</option>
      <option value="ky">Ilhas Cayman</option>
      <option value="cc">Ilhas Cocos</option>
      <option value="ck">Ilhas Cook</option>
      <option value="fo">Ilhas Faroé</option>
      <option value="fk">Ilhas Malvinas</option>
      <option value="mp">Ilhas Marianas do Norte</option>
      <option value="mh">Ilhas Marshall</option>
      <option value="sb">Ilhas Salomão</option>
      <option value="tc">Ilhas Turks e Caicos</option>
      <option value="vg">Ilhas Virgens Britânicas</option>
      <option value="vi">Ilhas Virgens dos EUA</option>
      <option value="in">Índia</option>
      <option value="id">Indonésia</option>
      <option value="ir">Irã</option>
      <option value="iq">Iraque</option>
      <option value="ie">Irlanda</option>
      <option value="is">Islândia</option>
      <option value="il">Israel</option>
      <option value="it">Itália</option>
      <option value="jm">Jamaica</option>
      <option value="jp">Japão</option>
      <option value="je">Jersey</option>
      <option value="jo">Jordânia</option>
      <option value="kw">Kuwait</option>
      <option value="la">Laos</option>
      <option value="ls">Lesoto</option>
      <option value="lv">Letônia</option>
      <option value="lb">Líbano</option>
      <option value="lr">Libéria</option>
      <option value="ly">Líbia</option>
      <option value="li">Liechtenstein</option>
      <option value="lt">Lituânia</option>
      <option value="lu">Luxemburgo</option>
      <option value="mo">Macau</option>
      <option value="mk">Macedônia do Norte</option>
      <option value="mg">Madagáscar</option>
      <option value="my">Malásia</option>
      <option value="mw">Malawi</option>
      <option value="mv">Maldivas</option>
      <option value="ml">Mali</option>
      <option value="mt">Malta</option>
      <option value="ma">Marrocos</option>
      <option value="mq">Martinica</option>
      <option value="mu">Maurícia</option>
      <option value="mr">Mauritânia</option>
      <option value="yt">Mayotte</option>
      <option value="mx">México</option>
      <option value="mm">Mianmar</option>
      <option value="fm">Micronésia</option>
      <option value="mz">Moçambique</option>
      <option value="md">Moldávia</option>
      <option value="mc">Mônaco</option>
      <option value="mn">Mongólia</option>
      <option value="me">Montenegro</option>
      <option value="ms">Montserrat</option>
      <option value="na">Namíbia</option>
      <option value="nr">Nauru</option>
      <option value="np">Nepal</option>
      <option value="ni">Nicarágua</option>
      <option value="ne">Níger</option>
      <option value="ng">Nigéria</option>
      <option value="nu">Niue</option>
      <option value="no">Noruega</option>
      <option value="nc">Nova Caledônia</option>
      <option value="nz">Nova Zelândia</option>
      <option value="om">Omã</option>
      <option value="pw">Palau</option>
      <option value="ps">Palestina</option>
      <option value="pa">Panamá</option>
      <option value="pg">Papua-Nova Guiné</option>
      <option value="pk">Paquistão</option>
      <option value="py">Paraguai</option>
      <option value="pe">Peru</option>
      <option value="pn">Pitcairn</option>
      <option value="pf">Polinésia Francesa</option>
      <option value="pl">Polônia</option>
      <option value="pr">Porto Rico</option>
      <option value="pt">Portugal</option>
      <option value="ke">Quênia</option>
      <option value="kg">Quirguistão</option>
      <option value="ki">Quiribati</option>
      <option value="gb">Reino Unido</option>
      <option value="cf">República Centro-Africana</option>
      <option value="cd">República Democrática do Congo</option>
      <option value="do">República Dominicana</option>
      <option value="cz">República Tcheca</option>
      <option value="re">Reunião</option>
      <option value="ro">Romênia</option>
      <option value="rw">Ruanda</option>
      <option value="ru">Rússia</option>
      <option value="eh">Saara Ocidental</option>
      <option value="ws">Samoa</option>
      <option value="as">Samoa Americana</option>
      <option value="sm">San Marino</option>
      <option value="sh">Santa Helena</option>
      <option value="lc">Santa Lúcia</option>
      <option value="bl">São Bartolomeu</option>
      <option value="kn">São Cristóvão e Nevis</option>
      <option value="mf">São Martinho</option>
      <option value="pm">São Pedro e Miquelão</option>
      <option value="st">São Tomé e Príncipe</option>
      <option value="vc">São Vicente e Granadinas</option>
      <option value="sc">Seicheles</option>
      <option value="sn">Senegal</option>
      <option value="sl">Serra Leoa</option>
      <option value="rs">Sérvia</option>
      <option value="sg">Singapura</option>
      <option value="sx">Sint Maarten</option>
      <option value="sy">Síria</option>
      <option value="so">Somália</option>
      <option value="lk">Sri Lanka</option>
      <option value="sd">Sudão</option>
      <option value="ss">Sudão do Sul</option>
      <option value="se">Suécia</option>
      <option value="ch">Suíça</option>
      <option value="sr">Suriname</option>
      <option value="sj">Svalbard e Jan Mayen</option>
      <option value="th">Tailândia</option>
      <option value="tw">Taiwan</option>
      <option value="tj">Tajiquistão</option>
      <option value="tz">Tanzânia</option>
      <option value="io">Território Britânico do Oceano Índico</option>
      <option value="tf">Territórios Franceses do Sul</option>
      <option value="tl">Timor-Leste</option>
      <option value="tg">Togo</option>
      <option value="tk">Tokelau</option>
      <option value="to">Tonga</option>
      <option value="tt">Trinidad e Tobago</option>
      <option value="tn">Tunísia</option>
      <option value="tm">Turcomenistão</option>
      <option value="tr">Turquia</option>
      <option value="tv">Tuvalu</option>
      <option value="ua">Ucrânia</option>
      <option value="ug">Uganda</option>
      <option value="uy">Uruguai</option>
      <option value="uz">Uzbequistão</option>
      <option value="vu">Vanuatu</option>
      <option value="va">Vaticano</option>
      <option value="ve">Venezuela</option>
      <option value="vn">Vietnã</option>
      <option value="wf">Wallis e Futuna</option>
      <option value="zm">Zâmbia</option>
      <option value="zw">Zimbábue</option>
    </>
  )
  const brazilDocuments = (
    <>
      <option value="cpf">CPF</option>
      <option value="rg">RG</option>
      <option value="pass">Passaporte</option>
    </>
  )
  const othersDocuments = <option value="pass">Passaporte</option>
  const documents =
    personFormik.values.countryIso2 === 'br' ? brazilDocuments : othersDocuments

  if (submissionSuccess) {
    return (
      <div className="grow-1 min-h-fit">
        <div className="flex flex-col items-center justify-center min-h-fit">
          {serverErrorMessage !== '' ? (
            <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
              <p>Não foi possível finalizar o cadastro.</p>
              <p>{serverErrorMessage}</p>
            </div>
          ) : null}
          <div className="flex flex-col items-center justify-center">
            <div>
              Caro(a), <b>{submittedUserName}</b>, verifique o seu e-mail.
            </div>
            <div>Lá deve ter uma mensagem do seu processo de registro.</div>
          </div>
          <div className="mt-2">
            Insira seu código de validação aqui:
            <form
              onSubmit={async (evt) => {
                evt.preventDefault()
                setWait(true)
                let currencyIso = 'BRL'
                let res = await confirmRegistration(
                  submittedEmail,
                  submitCode,
                  currencyIso
                )
                console.log('Response for user registration submission: ', res)
                if (res.success) {
                  router.push('/login')
                } else {
                  setWait(false)
                  setServerErrorMessage(res.message)
                }
              }}
            >
              <Input
                className="w-full min-w-0"
                id="code"
                name="code"
                type="text"
                value={submitCode}
                onChange={(evt) => setSubmitCode(evt.target.value)}
                disabled={wait}
                maxLength={10}
              />
              <div className="flex flex-row-reverse w-full p-2 sm:w-2/3 mt-4">
                <Button type="submit" appearance="primary" disabled={wait}>
                  Registrar {wait && <Spinner />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <form
        className="flex flex-col items-center justify-center mt-8 mb-8 min-h-fit w-dvw"
        onSubmit={personFormik.handleSubmit}
      >
        <div className="text-3xl">Cadastro:</div>
        {serverErrorMessage !== '' ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
            <p>Não foi possível submeter cadastro.</p>
            <p>{serverErrorMessage}</p>
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Nome de Usuário:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="name"
              name="name"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.name}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.name && personFormik.errors.name ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.name}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">E-mail:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="email"
              name="email"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.email}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.email && personFormik.errors.email ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.email}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Senha:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="password"
              name="password"
              type="password"
              onChange={personFormik.handleChange}
              value={personFormik.values.password}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.password && personFormik.errors.password ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.password}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Confirmação de Senha:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              onChange={personFormik.handleChange}
              value={personFormik.values.passwordRepeat}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.passwordRepeat &&
        personFormik.errors.passwordRepeat ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.passwordRepeat}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Primeiro Nome:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="firstName"
              name="firstName"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.firstName}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.firstName && personFormik.errors.firstName ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.firstName}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Último Nome (sobrenome):</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="lastName"
              name="lastName"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.lastName}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.lastName && personFormik.errors.lastName ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.lastName}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Nome Completo:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="completeName"
              name="completeName"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.completeName}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.completeName &&
        personFormik.errors.completeName ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.completeName}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Número de Telefone:</div>
          <div className="grow min-w-0">
            <Input
              className="w-full min-w-0"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.phoneNumber}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.phoneNumber && personFormik.errors.phoneNumber ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.phoneNumber}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Identificação Legal:</div>
          <div className="flex grow gap-2 min-w-0">
            <Select
              id="documentType"
              name="documentType"
              disabled={wait}
              value={personFormik.values.documentType}
              onChange={personFormik.handleChange}
            >
              {documents}
            </Select>
            <Input
              className="w-full min-w-0"
              id="legalIdentification"
              name="legalIdentification"
              type="text"
              onChange={personFormik.handleChange}
              value={personFormik.values.legalIdentification}
              disabled={wait}
            />
          </div>
        </div>
        {personFormik.touched.legalIdentification &&
        personFormik.errors.legalIdentification ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.legalIdentification}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">País:</div>
          <div className="grow min-w-0">
            <Select
              className="min-w-0"
              id="countryIso2"
              name="countryIso2"
              onChange={(ev) => {
                if (personFormik.values.countryIso2 !== 'br') {
                  personFormik.setFieldValue('documentType', 'pass')
                }
                personFormik.handleChange(ev)
              }}
              value={personFormik.values.countryIso2}
              disabled={wait}
            >
              {countries}
            </Select>
          </div>
        </div>
        {personFormik.touched.countryIso2 && personFormik.errors.countryIso2 ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.countryIso2}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-col items-stretch sm:flex-row sm:items-center gap-3 mt-4">
          <div className="sm:w-1/3">Título de Tratamento:</div>
          <div className="grow min-w-0">
            <Select
              className="min-w-0"
              id="title"
              name="title"
              onChange={personFormik.handleChange}
              value={personFormik.values.title}
              disabled={wait}
            >
              <option value=""></option>
              <option value="Sr.">Sr.</option>
              <option value="Sra.">Sra.</option>
              <option value="Srta.">Srta.</option>
              <option value="D.">D.</option>
            </Select>
          </div>
        </div>
        {personFormik.touched.title && personFormik.errors.title ? (
          <div className="w-4/5 text-red-500 text-bold">
            {personFormik.errors.title}
          </div>
        ) : null}
        <div className="flex flex-row-reverse w-full p-2 sm:w-2/3 mt-4">
          <Button type="submit" appearance="primary" disabled={wait}>
            Registrar {wait && <Spinner size="tiny" />}
          </Button>
          <div className="mr-4">
            <Button onClick={() => history.back()} disabled={wait}>
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    )
  }
}
