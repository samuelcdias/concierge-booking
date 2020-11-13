import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  title: string = 'Novo usuário'

  user: any = {} // Objeto vazio
  
  constructor(
    private userSrv: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado : id?
    if(params['id']) {
      // É caso de atualização. É necessário consultar
      // o back-end para recuperar o resgisto e colocar
      // para edição
      try {
        this.user = await this.userSrv.getById(params['id'])
        this.title = 'Atualizar usuário'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

    async getBack(form: NgForm) {

      let result = true;
      console.log(form);
      // form.dirty = formulário "sujo", não salvo (via código)
      // form.touched = o conteúdo de algum campo foi alterado (via usuário)
      if(form.dirty && form.touched) {
        let dialogRef = this.dialog.open(ConfirmDlgComponent, {
          width: '50%',
          data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
        });
  
        result = await dialogRef.afterClosed().toPromise();
  
      }
  
      if(result) {
        this.router.navigate(['/user']); // Retorna à listagem
      }
  }

  async save(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      if (this.user.password != this.user.confirmPassword){
        let msg = 'Senhas não coincidem.'

        this.snackBar.open(msg, 'Entendi', {duration: 5000})
      } else {
        try{
          let msg = 'Usuário atualizado com sucesso.'
          // Se existir o campo _id, é o caso de atualização
          if(this.user.id) {
            await this.userSrv.update(this.user)
          }
          // Senão, é caso de criar um novo
          else {
            await this.userSrv.save(this.user)
            msg = 'Usuário criado com sucesso.'
          }
          // Dá o feedback para o usuário
          this.snackBar.open(msg, 'Entendi', {duration: 5000})
          // Voltar À listagem
          this.router.navigate(['/user'])
        }
        catch(erro) {
          this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
        }
      }
    }
  }
}
