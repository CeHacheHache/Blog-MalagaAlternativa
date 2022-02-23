import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';

export enum Categoria {
  playa = 'Playa',
  montaña = 'Montaña',
  ciudad = 'Ciudad',
  rural = 'Rural',
  festivales = 'Festivales'
}

@Injectable({
  providedIn: 'root'
})
export class DatosPostsService {

  private arrayPosts: Post[];
  private postEdit: Post; // el post que se va a modificar en la seccion de Admin
  editMode: Boolean; // modo edit activo o desactivado en formulario
  arrayCategorias: Categoria[] //variable publica para que los demaás componentes pueda acceder al array de categorias



  constructor() {

    this.arrayCategorias = [
      Categoria.playa,
      Categoria.montaña,
      Categoria.ciudad,
      Categoria.rural,
      Categoria.festivales
    ]

    if (localStorage.getItem('posts')) {
      this.arrayPosts = JSON.parse(localStorage.getItem('posts'))
    } else {
      // posts de prueba, se deben borrar si se piensa utilizar esta página para monetizar y ser millonario
      this.arrayPosts = [
        {
          titulo: 'Playas Para Perros En Malaga',
          texto: `Playas para perros en Malaga 2022:
           
          Las únicas playas Oficiales para perros en Málaga para este verano 2022 son éstas 8:

        * Playa del Castillo Sohail, en Fuengirola
        * Arroyo Totalán, entre los municipios de Málaga y Rincón de la Victoria
        * Playa de Piedra Paloma, en Casares.
        * Playa Canina de Torre del Mar. 
        * Playa El Pinillo, en Marbella
        * Playa de Ventura de Mar, en Marbella
        * Playa canina de Torrox
        * Playa Arroyo Hondo, en Benalmádena. Se trata de una pequeña playa formada por roca y arena que este 2022 sustituye a la anterior playa canina en Tajo de la Soga.
        La Playa canina de Mijas cerró en 2015.
        

        Desde que el junio de 2015 la Junta emitiera un comunicado a los municipios que tenían playas para perros en Málaga para que retiraran sus carteles de playas caninas, pocas han sido las playas que han resistido. Según la Junta, las únicas playas que pueden habilitarse para ir con perro en verano son las que están bañadas por aguas no aptas para el baño, por suponer, según ellos, un riesgo para la salud de los bañistas los excrementos y orines de los canes. Los Ayuntamientos de Mijas y Casares tuvieron que retirar sus playas para perros, y muchos municipios de Málaga que tenían en sus planes habilitar playas caninas, tuvieron que dar un paso atrás.
      
        Afortunadamente, Fuengirola y otros municipios se mantienen firmes desafiando a la Junta y conservan sus playas canina, aunque sus aguas sí son aptas para el baño (según los usuarios, la mejor playa para perros de Málaga es la playa canina de Fuengirola). Esta playa se encuentra en la zona de Castillo Sohail.
        
        La verdad es que es una buenísima noticia que poco a poco los ayuntamientos vuelvan a abrir playas caninas, y estoy segura de que poco a poco los municipios costeros se darán cuenta de que es una buena iniciativa y habilitarán más playas para acudir junto a nuestros peludos.
        
        En temporada de baño está prohibida la entrada de animales domésticos a las playas (del 1 de junio al 30 de septiembre). Las Playas de Fuengirola, Arroyo Totalán, Torre del Mar, Marbella, Torrox, Casares y Benalmádena,  son las únicas playas de Málaga a las que se puede acudir en verano junto con tu mascota sin que te multen, pero he encontrado en otros foros y webs otras playas que suelen ser visitadas por gente con sus perros, pero mucho cuidadito, porque está prohibido y te pueden multar:
        * Playa de la Misericordia, junto a la Central Térmica.
        * Playamar: en la zona de desembocadura del río, cerca de Torremolinos
        * Peñón del Cuervo: Pequeña playa junto a la carretera, sin apenas equipamientos ni servicios del municipio de Málaga. Suelen acudir sobre todo a primera o a última hora.

        Aquí te dejo un trozo de las ordenanzas municipales del ayuntamiento de Málaga en el que se indica la prohibición de la entrada de animales domésticos a las playas:
        Artículo 15.
        -01. Queda prohibido el acceso de animales domésticos a las aguas y zonas de baño, con excepción del que resulte preciso para el desarrollo de actividades debidamente autorizadas por la autoridad sanitaria competente.
        -02. En el caso de animales abandonados que deambulen por la playa, serán responsables de los mismos sus propietarios.
        -03. Queda autorizada la presencia en la playa de perros lazarillos en compañía de la persona a quien sirvan, sin perjuicio de la responsabilidad de su poseedor y/o propietario ni de las medidas que el mismo deba adoptar para evitar molestias o riesgos para el resto de usuarios.
        -04. Quienes vulneren la prohibición del número 1, o no cumplan con las condiciones preceptuadas en el número 3, anteriores, deberán abandonar de inmediato la playa con el animal, a requerimiento verbal de los Agentes de la autoridad, quienes girarán parte de denuncia en orden a la instrucción del oportuno expediente sancionador.
        
        Desde aquí felicito a los ayuntamientos de Fuengirola, Torre del Mar, Marbella, Torrox y Casares por disponer de playas caninas. Estoy segura de que serán más los municipios que este verano 2022 se subirán al carro y pronto podremos ver a nuestros perros disfrutar en las playas. :-).
        Si has estado en alguna de estas playas, nos gustaría mucho que nos contaras tu experiencia, seguro que es de gran ayuda a otros usuarios.`,
          
          autor: 'Veronica Arnedo',
          imagen: 'https://cdn.redcanina.es/wp-content/uploads/2016/03/playa-canina-el-castillo-fuengirola-e1458865053703.jpg',
          fecha: new Date,
          categoria: Categoria.playa,
          id: 1
        },
        {
          titulo: "Entrada Gratuita al Museo Picasso. Dia de Andalucia 2022",
          texto: `¡Celebremos nuestro arte y nuestra cultura!


          Lunes 28 Feb. 2022

          Con motivo de la celebración del Día de Andalucía 2022, el Museo Picasso Málaga vuelve a abrir sus puertas el próximo lunes 28 de febrero en una jornada gratuita en la que disfrutar de la obra del malagueño Pablo Picasso, conocer mejor su vínculo con maestros como El Greco, Zurbarán o Bejarano, así como las fotografías de Brassaï, uno de los más reconocidos fotógrafos europeos de la primera mitad del siglo XX. 

          La exposición Cara a cara. Picasso y los maestros antiguos ofrece al visitante una oportunidad única de descubrir vínculos entre la obra de Picasso y una selección de obras de grandes maestros del pasado, al yuxtaponer sus pinturas a las de El Greco, Francisco Pacheco, Giovanni Battista Caracciolo, Francisco de Zurbarán, Cornelius Norbertus Gijsbretchs, Bernardo Lorente Germán y Diego Bejarano. 

          También podrán visitar la exposición El París de Brassaï. Fotos de la ciudad que amó Picasso, que muestra la obra de uno de los más reconocidos fotógrafos europeos de la primera mitad del siglo XX, quién con su trabajo contribuyó a elaborar la imagen universal del Paris eterno.  Su trabajo se exhibe junto a obras de Pablo Picasso, Pierre Bonnard, Georges Braque, Lucien Clergue, Fernand Léger, Dora Maar y Henri Michaux, además de películas de época, carteles, partituras y abundante documentación.

          Por su parte, Diálogos con Picasso. Colección 2020-2023 permite al visitante obtener, mediante un recorrido temático y cronológico, un conocimiento más profundo de la trayectoria artística de Picasso. La colección se ha enriquecido con la incorporación, a modo de obra invitada hasta el próximo mes de mayo, de un importante lienzo cubista de Pablo Picasso, El remero, ejecutado en Cadaqués en el verano de 1910 y perteneciente a la colección The Museum of Fine Arts de Houston, EEUU. Y hasta el mes de marzo, también incluye otra obra invitada de otro museo americano, el Fine Arts Museum de San Francisco. Se trata de Bodegón con cráneo, puerros y jarra (1945), que Picasso pintó en los últimos meses de la II Guerra Mundial. 

          El horario de apertura del Museo es de 10.00 a 18.00 h (cierre de Taquilla a las 17.30 h)..`,
          autor: 'Museo Picasso',
          imagen: 'https://www.museopicassomalaga.org/sites/default/files/ActividadCultural/dia_andalucia_2022_655.jpg',
          fecha: new Date,
          categoria: Categoria.ciudad,
          id: 2
        },
        {
          titulo: "EXPOSICIÓN ‘DAYS OF PUNK. MICHAEL GRECCO’",
          texto: `Del 4 de febrero al 26 de junio de 2022

          Entrada libre hasta completar aforo.

          Sala 017

          De martes a domingo de 11.00 a 14.00 y de 17.00 a 20.30 horas. Lunes Cerrado.

 

          La exposición «Days of Punk» saca a la luz las fotografías que han permanecido ocultas durante décadas en archivos y que Michael Grecco realizó mientras documentaba la escena de los clubes nocturnos y los conciertos en Boston y Nueva York durante el inicio del punk rock, desde 1978, abarcando también los períodos del Post-Punk y New Wave, hasta 1991. Grecco, un club kid de la época, tuvo la oportunidad única de integrarse en esta escena revolucionaria como cronista y como participante. La muestra se compone de más de un centenar de imágenes y se acompaña de un documental y de una banda sonora. Esta exposición que se presenta ahora en Málaga, en La Térmica, tras su estreno en Photo London, recorrerá el mundo en los próximos años.
          
          Michael Grecco (EE.UU, 1958) es un premiado director de cine de renombre internacional y fotógrafo de prensa y publicidad, conocido por sus retratos de celebridades, portadas de revistas e innovadoras, imágenes para prensa y publicidad. Ha trabajado para marcas muy conocidas como Apple, NBC/Universal, HBO, ABC, Kodak, IBM, Yahoo! o Pfizer. La exposición «Days of Punk», creada a partir de las imágenes que componen su libro «Punk, Post Punk, New Wave: Onstage, Backstage, In Your Face, 1978-1991» narra sus trabajos fotográficos y anécdotas durante los primeros años de la incipiente escena de la música punk en los Estados Unidos, concretamente en Boston y Nueva York.`,
          autor: 'La Térmica',
          imagen: 'https://www.latermicamalaga.com/wp-content/uploads/2022/01/19801113_Williams_Wendy_MGP_0017-1-scaled.jpg',
          fecha: new Date,
          categoria: Categoria.ciudad,
          id: 3
        },

        {
          titulo: "Realizar una Vía Ferrata en Málaga’",
          texto: `¿Te gustaría hacer una ruta de escalada fácil pero muy emocionante? Pues las vías ferratas son la mejor opción para tí. Esta modalidad de escalada te acercará a las entrañas de la montaña, descubriendo muchos rincones que no podrías hacerlo de otra manera. 
 

          ¿Qué es una vía ferrata?
          Las vías ferratas son anclajes en las rocas en forma de peldaños que no suelen resultar muy difícil de utilizar, no se necesita unos conocimientos de escalada para realizarlos, solo estar en una forma física normal.

          Vía Ferrata del Tajo de Ronda
          Es una buena opción para la primera toma de contacto con la escalada y muchas de ellas se pueden realizar incluso con niños.      
          
          Una de las vías Ferratas más impresionantes de Málaga sin duda es la del Tajo de Ronda, su belleza es espectacular al Puente Nuevo y el río Guadalevín.  

          El recorrido es de una dificultad media-baja y suelen estar programado en torno a las dos o tres horas de duración. Se recomienda llevar ropa cómoda, crema solar, agua, algo de comida o fruta y sobretodo… ¡Una cámara de fotos!

          Hay varias empresas que realizan vías ferratas en Málaga y una de mis preferidas en Ronda es alandalusactiva.
          
          Un día de barranquismo en uno de sus ríos
          Los ríos de Málaga no son muy caudalosos, en verano a penas cuentan con agua, sin embargo, una de las actividades más refrescantes y divertidas que puedes realizar al aire libre es barranquismo en alguno de sus ríos.
          
          
          ¿Qué es el barranquismo?

          El barranquismo se trata en hacer senderismo a través de los ríos atravesando sus gargantas y pozas. En el que se suele mezclar, senderismo, escalada, deslizamiento, natación, rapel. Es una aventura muy divertida en la naturaleza y se ha popularizado mucho en los últimos años.

          Barranquismo en Málaga
          En Málaga hay muchos ríos en los que poder hacer barranquismo con una dificultad baja, en la que puedes realizarlo con toda la familia. Ríos como El Chillar, El Higuerón o El río de Benahavís se encuentran entre los más famosos.`,
          autor: 'malagaadventures.com',
          imagen: 'https://malagaadventures.com/wp-content/uploads/2020/06/Caminito_del_Rey_4.jpg',
          fecha: new Date,
          categoria: Categoria.montaña,
          id: 4
        },

         {
          titulo: "Concierto de Antílopez en Málaga",
           texto: `
          
          
          
           El dúo Antílopez vuelve a los escenarios con la gira Mutar fama 2022. Paradas confirmadas en Madrid, Barcelona, Bilbao, Oviedo, Vigo, León, Valladolid, Murcia, Granada, Albacete y otros. Entradas ya a la venta en Wegow y puntos de venta autorizados.`,
          autor: 'https://www.jacksonlive.es/',
          imagen: 'https://www.esclaustre.com/wp-content/uploads/2021/06/Ant%C3%ADlopez.jpg',
          fecha: new Date,
          categoria: Categoria.festivales,
          id: 5
        },
         
         {
          titulo: "Ideas para una escapada rural en Málaga y la Costa del Sol",
           texto: `Los alojamientos rurales de la provincia de Málaga son el refugio ideal para descansar en plena naturaleza y visitar los pueblos del interior. Una excelente idea si quieres conocer la gastronomía tradicional, practicar turismo activo y olvidarte del estrés. A esto se suman los innumerables alojamientos situados en el espectacular entorno de Málaga y la Costa del Sol, caracterizado por sus idílicos paisajes y su encanto.

          Si estás listo para participar en esta aventura, continúa y lee sobre las casas rurales con más encanto de Málaga.


          Antequera
          Es de esos destinos que uno no espera encontrar en España. Centro de Andalucía y con miles de años de historia contiene un espectacular legado declarado Patrimonio de la Humanidad por la UNESCO, compuesto por el Conjunto Arqueológico Dólmenes de Antequera, la Peña de los Enamorados, y el Paraje Natural Torcal de Antequera, dónde encontrarás un paisaje alucinante plagado con formaciones rocosas únicas. Antequera representa un punto ideal desde el cual recorrer el Caminito del Rey, a tan sólo 45 minutos. Ideal para hacer senderismo y olvidarse de todo.

          Además de todo ello, podrás conocer innumerables iglesias, especialmente la Real Colegiata de Santa María la Mayor, o la Alcazaba de Antequera, declarada Monumento Nacional.

          Cerca de Antequera, en Villanueva de la Concepción, encontramos la Villa Antisa, que está situada en un olivar de 11.000 m², en el sur del Torcal de Antequera y cuenta con la “Q” de Calidad Turística y ofrece a sus huéspedes una estancia agradable y repleta de detalles para que la experiencia sea completa. 

          Acebuchal
          La aldea del Acebuchal en la Axarquía, estaba abandonado hasta que una mujer, que solía visitar las ruinas del pueblo de vez en cuando porque su padre había nacido allí, se decidió a comprar dos casas, rehabilitarlas y apostar por el turismo rural en el año 1998. Esta mujer y su familia poco a poco pusieron luz y agua corriente y fueron adecentando el lugar para el turismo rural. En 2005 decidieron abrir una taberna en la que puedes degustar unas carnes exquisitas.

          En este entorno perfecto para escapar de la rutina y olvidarse de todo, encontramos el alojamiento rural Casa Antonio, una pequeña y acogedora casita de campo con dos plantas con una decoración tradicional muy cuidada. No te vayas de Acebuchal sin probar el pan casero que ofrecen en alguno de sus restaurantes.

          Descubre el Acebuchal en este vídeo 

          Yunquera
          El municipio de Yunquera se halla enclavado en un territorio privilegiado: el corazón de la Sierra de las Nieves. Debido a ello, se encuentra a una altitud de 681 metros y 61 kilómetros lo separan de la capital de provincia, Málaga. Entre sus lugares de interés destaca la Torre Vigía o Castillo o la Ermita. También debido a su situación privilegiada, Yunquera posee uno de los bosques de Pinsapos más importantes de Europa y goza de un entorno privilegiado.

          El alojamiento que encontramos allí, el Molino La Teja, está construido en los restos de un antiguo molino de trigo, y consta de 3 habitaciones, con un total de 8 plazas y 2 baños completos. Durante la época veraniega ofrece un jardín, piscina y barbacoa.`,
          autor: 'https://blog.visitacostadelsol.com/',
          imagen: 'https://blog.visitacostadelsol.com/hubfs/escapada_rural_malaga.jpg',
          fecha: new Date,
          categoria: Categoria.rural,
          id: 6
        },
         
         {
          titulo: "TURISMO RURAL EN MÁLAGA: PLAN 1",
           texto: `LA COMARCA DE LA AXARQUÍA
          La Posada Morisca se halla situada en la parte más oriental de la provincia malagueña, limitando con Granada, en plena la comarca de la Axarquía.

          Estas tierras axárquicas compaginan una zona costera cálida y un interior donde las montañas se pierden hacia las nevadas cumbres de Sierra Nevada.

          Dentro de esta enorme cadena montañosa se hallan las sierras de Alhama, Tejada y Almijara declaradas recientemente Parque Natural. En ella se alza majestuoso el Pico de La Maroma, el punto más alto de la provincia de Málaga con sus 2.066 metros de altura.

          La historia de la comarca está ligada indudablemente al paso de los árabes por estas tierras que le confirieron, no sólo su nombre, sino también sus costumbres y cultura que se han mantenido inalterables al paso del tiempo.

          En su viaje por la Axarquía pueden seguir cinco rutas turísticas: La Ruta del Vino, La Ruta del Sol y Subtropical (aguacate), La Ruta Mudéjar, La Ruta de la Pasa y La Ruta del Aceite y de los Montes.`,
          autor: 'https://www.laposadamorisca.com/',
          imagen: 'https://www.laposadamorisca.com/wp-content/uploads/2019/01/turismo-rural-en-malaga-planes-axarquia.jpg',
          fecha: new Date,
          categoria: Categoria.rural,
          id: 7
        },
         
         {
          titulo: "Concierto de Fito & Fitipaldis en Fuengirola",
           texto: `La gira "Cada vez más cadáver tour 2022" pasará por el Marenostrum de Fuengirola (Málaga). Artista invitado Morgan. ¡Entradas ya a la venta!
          Fito Cabrales y su banda los Fitipaldis han publicado su nuevo álbum el 24 de septiembre del año 2021, llamado "Cada vez más cadáver". Es el séptimo disco de estudio de la banda que sale siete años después de su anterior disco "Huyendo conmigo de... Leer mas sobre: Cada vez más cadáver Tour 2022`,
          autor: 'https://www.jacksonlive.es/',
          imagen: 'https://s3.eu-central-1.amazonaws.com/images.jacksonlive.es/upload/artists/high/1506944804.jpg',
          fecha: new Date,
          categoria: Categoria.festivales,
          id: 8
        },
         
        {
          titulo: "Concierto de Leiva en Marbella",
           texto: `Leiva vuelve al escenario del Auditorio La Cantera con su gira Cuando te muerdes el labio
          Leiva presentará las canciones de su nuevo disco en la gira Cuando te muerdes el labio. Este último álbum es un disco de canciones a dúo y cuenta con la participación de artistas de la talla de Zahara o Natalia Lacunza

          Ya hay confirmadas varias fechas en nuestro país y en México en donde el artista ya ha agotado las entradas.

          Tienes toda la información en su web`,
          autor: 'https://www.jacksonlive.es/',
          imagen: 'https://www.lavanguardia.com/files/image_449_253/uploads/2020/12/06/5fccb4f514e15.jpeg',
          fecha: new Date,
          categoria: Categoria.festivales,
          id: 9
        },

          {
          titulo: "10 Playas de Málaga que hay que visitar",
           texto: `Con una extensión de 160 km, la Costa del Sol de ofrece una cantidad inmensa de playas que visitar para disfrutar del sol, el mar… y por qué no ¡una sangría! Las playas de Málaga ofrecen muchas opciones para pasar un buen rato con la familia, hacer una escapada romántica con tu pareja o hacer deportes de aventura con tus mejores amigos.

          En este post te damos una lista de 10 playas que tienes que visitar en Málaga, y si quieres saber los mejores consejos para ir a estas playas echa un vistazo a nuestra Guía de las Mejores Playas de Málaga 2020.`,
          autor: 'https://malagaadventures.com/',
          imagen: 'https://malagaadventures.com/wp-content/uploads/2020/06/maro-1.jpg',
          fecha: new Date,
          categoria: Categoria.playa,
          id: 10
        },
          
         {
          titulo: "¿Quieres probar  la escalada en Málaga?",
           texto: `Entre nuestras actividades de Turismo Activo contamos con un ejercicio super completo como es la escala.
          Contamos con un grupo de instructores profesional para la iniciación a la escalada, además de poder disfrutar de las vistas impresionantes que nos ofrece El Chorro. ¿A qué esperas para apuntarte?
          Nuestras actividades para realizar escalada en Málaga te proporcionarán esa dosis de adrenalina y aventura que tu cuerpo necesita.
          Actividades de escalada en Málaga
          
          ¿Te atreves a realizar una actividad diferente y de forma segura? En La Garganta Activa contamos con instructores de primer nivel tanto para escaladores principiantes como para escaladores con experiencia.

          Te sentirás en todo momento seguro, debido a que nuestros instructores velarán de tu seguridad al principio y durante la actividad. Además te proporcionamos todo el material necesario, ¡sólo faltan tus ganas de pasar un buen rato!

          El Chorro es un entorno único e increíble, ideal para aquellos escaladores que busquen nuevos desafíos. Además de adecuar cada sector a tu nivel.`,
          autor: 'La Garganta. Complejo Turistico',
          imagen: 'https://lagarganta.com/wp-content/uploads/2020/07/que-hacer-en-el-torcal-de-antequera.jpg',
          fecha: new Date,
          categoria: Categoria.montaña,
          id: 11
        },
      ];
    }

  }

  getAllPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.arrayPosts);
      reject('ha ocurrido un error');
    })
  }

  addNewPost(newPost: Post): Promise<string> {
    return new Promise((resolve, reject) => {
      this.arrayPosts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(this.arrayPosts))
      resolve(`El Post ${newPost.titulo} se ha agregado Correctamente!`);
      reject('Ha ocurrido un error');
    });
  }

  getPostByCategory(pCategoria: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const filteredList = this.arrayPosts.filter(post => post.categoria === pCategoria);
      resolve(filteredList);
      reject('Ha ocuriido un error');
    })
  }

  //busca un post segun el id
  getPostById(pId: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      resolve(this.arrayPosts.find(post => post.id === pId));
      reject('Ha ocurrido un error');
    })
  }

  //añade un id al post nuevo
  getNewPostId(): Promise<number> {
    return new Promise((resolve, reject) => {
      const id = (this.arrayPosts.length + 1);
      resolve(id);
    })
  }

  //------------------seccion ADMIN ---------------------

  //Borrar un post
  deletePost(pIndex: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.arrayPosts.splice(pIndex, 1);
      // actualizar los id de los post al borrar un elemento del array
      this.arrayPosts.forEach(post => post.id = (this.arrayPosts.indexOf(post) + 1));
      localStorage.setItem('posts', JSON.stringify(this.arrayPosts))
      resolve('Post Borrado!');
      reject(error => console.log(error));
    });
  }

  // activa el modo editar y selecciona el post a editar
  activateEditMode(pIndex: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.postEdit = this.arrayPosts[pIndex];
      this.editMode = true
      resolve(this.postEdit.titulo);
    })
  }


  // se envia la info del post a editar para el formulario
  getPostEdit(): Promise<Post> {
    return new Promise((resolve, reject) => {
      resolve(this.postEdit);
      reject(error => console.log(error));
    })
  }


  // se modifica el post editado en el array
  modifyPost(pPost: Post, pIndex: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.arrayPosts.splice(pIndex, 1, pPost);
      localStorage.setItem('posts', JSON.stringify(this.arrayPosts))
      resolve('Post Modificado')
    })
  }

}
