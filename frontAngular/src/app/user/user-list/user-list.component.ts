import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users : any = [] // Vetor vazio

  displayedColumns : string[] = ['name', 'username', 'editar', 'excluir']

  constructor(
    private UserSrv : UserService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.users = await this.UserSrv.get() 
    console.log(this.users)
  }

  async removeUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este usuário?'}
    });

    let result = await dialogRef.afterClosed().toPromise();

    if(result) {
      try {
        await this.UserSrv.remove(id)
        this.ngOnInit() //atualizar dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi',
        {duration: 5000});
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este item.')
        this.snackBar.open('ERRO: não foi possível excluir este item.',
          'Que pena!', {duration: 5000});
      }
    }
  }
}
