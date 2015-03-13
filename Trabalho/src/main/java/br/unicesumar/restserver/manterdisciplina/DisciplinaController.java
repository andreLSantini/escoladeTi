
package br.unicesumar.restserver.manterdisciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/Disciplinas")
@Transactional
public class DisciplinaController {
    
    
    @Autowired
    EntityManager em;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Disciplina> getDisciplicas(){
        Query list = em.createQuery("from Disciplina");
        return list.getResultList();
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarDisciplina(@RequestBody Disciplina disciplina ){
        em.persist(disciplina);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void alterarDisciplina(@RequestBody Disciplina disciplina){
        Disciplina Alterada = new Disciplina();
        Alterada = em.merge(disciplina);
        em.persist(Alterada);
    }
    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    public void excluirDisciplina(@PathVariable Long id){
        Disciplina excluir = em.find(Disciplina.class, id);
        em.remove(excluir);
    }
}
