import { QuartoService } from './../../quarto/quarto.service';
import { ReservaService } from './../reserva.service';
import { Directive, Component, EventEmitter, Input, OnInit, Self } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, NgControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent implements OnInit {

  @Input('emitEvent') emitter: EventEmitter<any>;
  private subscription: Subscription;


  title: string = 'Nova Reserva'
  minDate = new Date();

  reserva: any = {} // Objeto vazio
  cliente: any = {} // Objeto vazio
  hospede: any = {} // Objeto vazio
  quartos: any = {} // Objeto vazio
  

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor(
    private reservaSrv: ReservaService,
    private quartoSrv: QuartoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Self() private ngControl: NgControl
  ) { 
    this.emitter = new EventEmitter();
  }
  

  async ngOnInit() {
    this.subscription = this.ngControl.valueChanges
      .subscribe(data => this.emitter.emit(data));

    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado : id?
    if(params['id']) {
      // É caso de atualização. É necessário consultar
      // o back-end para recuperar o resgisto e colocar
      // para edição
      try {
        this.reserva = await this.reservaSrv.getById(params['id'])
        this.title = 'Atualizar usuário'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      try{
        let msg = 'Usuário atualizado com sucesso.'
        // Se existir o campo _id, é o caso de atualização
        if(this.reserva._id) {
          await this.reservaSrv.update(this.reserva)
        }
        // Senão, é caso de criar um novo
        else {
          await this.reservaSrv.save(this.reserva)
          msg = 'Usuário criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar À listagem
        this.router.navigate(['/reserva'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }
}

