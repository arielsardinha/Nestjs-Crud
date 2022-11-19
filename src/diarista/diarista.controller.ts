import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
  Request,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Diarista } from './diarista.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Controller('diaristas')
export class DiaristaController {
  constructor(
    @InjectRepository(Diarista)
    private diaristaRepository: Repository<Diarista>,
  ) {}

  @Get()
  @Render('lista_diarista')
  async listarDiaristas() {
    return {
      diaristas: await this.diaristaRepository.find(),
      title: 'Lista de  diaristas',
    };
  }

  @Get('diarista/:id')
  @Render('detalhes_diarista')
  async detalhesDiarista(@Param('id') id: number) {
    return {
      diarista: await this.diaristaRepository.findOneBy({ id }),
      title: 'Diarista',
    };
  }

  @Get('diarista/:id/edit')
  @Render('edit_diarista')
  async edit(@Param('id') id: number) {
    const diarista = await this.diaristaRepository.findOneBy({ id });

    return { diarista, title: 'Editar Diarista' };
  }

  @Patch(':id')
  @Redirect('/diaristas')
  async update(@Param('id') id: number, @Req() { body }: Request) {
    const diarista = await this.diaristaRepository.findOneBy({ id });

    diarista.nome = body['nome'];
    diarista.endereco = body['endereco'];
    diarista.idade = body['idade'];

    return await this.diaristaRepository.save(diarista);
  }

  @Get('create')
  @Render('create_diarista')
  createDiaristaView() {
    //
  }

  @Post()
  @Redirect('/diaristas')
  async create(@Req() { body }: Request) {
    const diarista = new Diarista();
    diarista.nome = body['nome'];
    diarista.endereco = body['endereco'];
    diarista.idade = body['idade'];

    return await this.diaristaRepository.save(diarista);
  }

  @Delete(':id')
  @Redirect('/diaristas')
  async deleteDiarista(@Param('id') id: number) {
    return await this.diaristaRepository.delete(id);
  }
}
