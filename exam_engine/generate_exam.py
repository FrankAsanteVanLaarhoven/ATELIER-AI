import json, random, argparse, pathlib
QUOTAS={1:16,2:11,3:12,4:12,5:9}

def generate(bank_path, seed=42):
    bank=json.load(open(bank_path))['items']
    rng=random.Random(seed)
    chosen=[]
    # choose four scenario families first; then fill domain quotas preferring those scenarios
    scenarios=rng.sample(['S1','S2','S3','S4','S5','S6'],4)
    for d,q in QUOTAS.items():
        pool=[x for x in bank if x['domain']==d and x['scenario'] in scenarios]
        rng.shuffle(pool)
        if len(pool)<q:
            extra=[x for x in bank if x['domain']==d and x not in pool]
            rng.shuffle(extra); pool+=extra
        chosen += pool[:q]
    rng.shuffle(chosen)
    return {'seed':seed,'scenario_focus':scenarios,'time_minutes':120,'question_count':60,'items':chosen}

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('--bank',default=str(pathlib.Path(__file__).with_name('question_bank.json'))); ap.add_argument('--seed',type=int,default=42); ap.add_argument('--out',default=str(pathlib.Path(__file__).with_name('mock_form.json')))
    a=ap.parse_args(); exam=generate(a.bank,a.seed); json.dump(exam,open(a.out,'w'),indent=2); print(a.out)
