import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoSolicitacaoGestorPage } from './tipo-solicitacao-gestor.page';

describe('TipoSolicitacaoGestorPage', () => {
  let component: TipoSolicitacaoGestorPage;
  let fixture: ComponentFixture<TipoSolicitacaoGestorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSolicitacaoGestorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoSolicitacaoGestorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
