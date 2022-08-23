import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinhaSolicitacaoDetalhePage } from './minha-solicitacao-detalhe.page';

describe('MinhaSolicitacaoDetalhePage', () => {
  let component: MinhaSolicitacaoDetalhePage;
  let fixture: ComponentFixture<MinhaSolicitacaoDetalhePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhaSolicitacaoDetalhePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinhaSolicitacaoDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
